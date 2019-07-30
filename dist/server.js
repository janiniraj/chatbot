"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const socketIO = require("socket.io");
const intents_mapper_1 = require("./util/intents_mapper");
const apiai_1 = require("./services/config/apiai");
const ai_function_1 = require("./services/ai_function");
//Later in your code
dotenv.config();
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;
const app = express();
app.use(express.static(__dirname + '/UI_TinaChatalk/views'));
app.use(express.static(__dirname + '/UI_TinaChatalk/public'));
const reportRoutes = require('./routes/user');
const api_ai = require('apiai')(APIAI_TOKEN);
const server = app.listen(process.env.PORT || 8082, () => {
    console.log('Express server listening on port %d in mode %s', server.address()["port"], app.settings.env);
});
const io = socketIO(server);
app.use('/api/user', reportRoutes);
/*RUN for UI_TinaChat ONLY*/
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/UI_TinaChat/views/index.html');
// });
/*-------------------------*/
/*RUN for UI_TinaChatalk ONLY*/
app.get('/talk', (req, res) => {
    res.sendFile(__dirname + '/UI_TinaChatalk/views/talk.html');
});
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/UI_TinaChatalk/views/chat.html');
});
/*-----------------------------*/
app.get('*', (req, res) => {
    // res.send('Sorry, page not found!');
    res.redirect('/chat');
});
io.on('connection', (socket) => {
    socket.on('chat message', (text) => {
        console.log('Message: ' + text);
        // Get a reply from API.ai
        let api_request = api_ai.textRequest(text, {
            sessionId: APIAI_SESSION_ID
        });
        api_request.on('response', (response) => {
            const aiText = response.result.fulfillment.messages[0].speech;
            const result_ai = new apiai_1.Apiai(aiText, "normal_ask", response.result);
            console.log('Bot reply: ', aiText);
            socket.emit('bot reply', result_ai);
            // const param_count = Object.keys(response.result.parameters).length;
            const intents_params = intents_mapper_1.IntentsMapper(response.result.metadata.intentName, response.result.parameters);
            const ai_reply = new ai_function_1.AiFunction(response, intents_params.isAuth, socket);
            if (intents_params.index === 1) { //Check login
                ai_reply.aiLoginStatus();
            }
            else if (intents_params.index === 2) { //Do logout
                ai_reply.aiLogoutStatus();
            }
            else if (intents_params.index > 2) { //General AI Function
                ai_reply.aiGeneralFunction(intents_params.index);
            }
            /*--------------------------------------*/
        });
        api_request.on('error', (error) => {
            console.log(error);
        });
        api_request.end();
    });
});
//# sourceMappingURL=server.js.map