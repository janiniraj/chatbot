'use strict';

const socket = io();

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
        

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

    $.fn.toggleZindex= function() {
        var $this  = $(this);
        if($this.css("z-index") == "-1"){
            $("#mic_button").css("visibility", "hidden");
            $this.css("z-index", "1");
        }else{
            $("#mic_button").css("visibility", "visible");
            $this.css("z-index", "-1");
        }
        return this;
    };

    $(function () {
        var getMessageText, message_side, sendMessage, getBotMessage, botTalk, getLoadMessage;
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
        
        botTalk = function (text) {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = text;
            synth.speak(utterance);
        };

        var username;
        username = sessionStorage.getItem('username');

        if(username === null) {
            getBotMessage('Hi, My name is Fulan :)');
            setTimeout(function () {
                getBotMessage('I\'m your assistant');
            }, 1000);
            setTimeout(function () {
                $("#sendTalkWindow").removeClass("disappeared");
                getBotMessage('What can I do for you');
            }, 2000);
        } else {
            $("#sendTalkWindow").removeClass("disappeared");
            getBotMessage('Hi, '+username+". Welcome back.");
        }
        
        $('.send_message').click(function (e) {
            $("#mic_loading").toggleZindex();
            recognition.start();
        });

        recognition.addEventListener('speechstart', () => {
            console.log('Speech has been detected.');
        });
        
        recognition.addEventListener('result', (e) => {
            console.log('Result has been detected.');

            let last = e.results.length - 1;
            let text = e.results[last][0].transcript;
            console.log('Confidence: ' + e.results[0][0].confidence);

            socket.emit('chat message', text);
            return sendMessage(text);
        });
        
        recognition.addEventListener('speechend', (event) => {
            console.log("event", event);
            $("#mic_loading").toggleZindex();
            recognition.stop();
        });

        recognition.addEventListener('error', (e) => {
            $("#mic_loading").toggleZindex();
            console.log('Error', e.error);
        });
        
        socket.on('bot reply', function(replyText) {
            const bot_reply = replyText["aitext"];
            
            if(replyText["text"] == '') {
                replyText = '(No answer...)';
            } else {
                if(replyText["aistatus"] === "normal_ask") {
                    botTalk(bot_reply);
                    getBotMessage(bot_reply);
                } else {
                    getLoadMessage("appeared");
                    $("#sendTalkWindow").addClass("disappeared");

                    setTimeout(function() {
                        $(".load_message").addClass("disappeared");
                        $("#sendTalkWindow").removeClass("disappeared");

                        if(replyText["aistatus"] === "auth_ask") {
                            sessionStorage.setItem("username", replyText["airesponse"]);
                        } else if(replyText["aistatus"] === "exit_ask") {
                            sessionStorage.removeItem("username");
                        }
                        botTalk(bot_reply);
                        getBotMessage(bot_reply);
                    }, 5500);
                }
            }
        });
    });
}.call(this));


        
            
    