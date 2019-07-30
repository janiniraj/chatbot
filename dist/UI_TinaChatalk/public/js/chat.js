'use strict';

const socket = io();

(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    let node_text = !$message[0].previousElementSibling ? "no-items" : $message[0].previousElementSibling.innerText;
	                // console.log("node_text", node_text);
                    if(node_text.includes("password") || node_text.includes("Password")) {
                        $message.addClass("password_mask");
                    }
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };

    var Loader;
    Loader = function (arg) {
        this.load_class = arg.load_class;
        this.draw = function (_this) {
            return function () {
                var $load;
                $load = $($('.load_template').clone().html());
                $load.addClass('left');
                $('.messages').append($load);
                return setTimeout(function () {
                    return $load.addClass(_this.load_class+' load_message');
                }, 0);
            };
        }(this);
        return this;
    };

    $(function () {
        var getMessageText, message_side, sendMessage, getBotMessage, getLoadMessage;
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function (text) {
            message_side = 'right';
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            
            message = new Message({
                text: text,
                message_side: message_side
            });
            
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };

        getBotMessage = function (text) {
            message_side = 'left';
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');

            message = new Message({
                text: text,
                message_side: message_side
            });

            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };

        getLoadMessage = function (loadclass) {
            var $loader, loader;
            $('.message_input').val('');
            $loader = $('.messages');

            loader = new Loader({
                load_class: loadclass
            });

            loader.draw();
            return $loader.animate({ scrollTop: $loader.prop('scrollHeight') }, 300);
        };

        var username;
        username = sessionStorage.getItem('username');

        if(username === null) {
            getBotMessage('Hi, My name is Tina :)');
            setTimeout(function () {
                getBotMessage('I\'m your assistant');
            }, 1000);
            setTimeout(function () {
                $("#sendTextWindow").removeClass("disappeared");
                $(".message_input").focus();
                getBotMessage('What can I do for you');
            }, 2000);
        } else {
            $("#sendTextWindow").removeClass("disappeared");
            $(".message_input").focus();
            getBotMessage('Hi, '+username+". Welcome back.");
        }
        
        $('.send_message').click(function (e) {
            socket.emit('chat message', getMessageText());
            return sendMessage(getMessageText());
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                socket.emit('chat message', getMessageText());
                return sendMessage(getMessageText());
            }
        });
        
        socket.on('bot reply', function(replyText) {
            const bot_reply = replyText["aitext"];

            $("#sendTextWindow").find("input").removeClass("password_mask");

            if(replyText == '') {
                replyText = '(No answer...)';
            } else {
                if(replyText["aistatus"] === "normal_ask") {
                    if(replyText["airesponse"].action = "input.sign-in" && replyText["airesponse"].parameters.email) {
                        $("#sendTextWindow").find("input").addClass("password_mask");
                    }

                    getBotMessage(bot_reply);
                } else {
                	console.log("here");
                    getLoadMessage("appeared");
                    $("#sendTextWindow").addClass("disappeared");

                    setTimeout(function() {
                        $(".load_message").addClass("disappeared");
                        $("#sendTextWindow").removeClass("disappeared");
                        $(".message_input").focus();

                        if(replyText["aistatus"] === "auth_ask") {
                            sessionStorage.setItem("username", replyText["airesponse"]);
                        } else if(replyText["aistatus"] === "exit_ask") {
                            sessionStorage.removeItem("username");
                        }
                        getBotMessage(bot_reply);
                    }, 2000);
                }
            }
        });
    });
}.call(this));


        
            
    