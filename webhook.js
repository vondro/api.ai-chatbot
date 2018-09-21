const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Express server listening on port %d in %s mode',
    server.address().port, app.settings.env);
});

/* GET for Facebook Validation */
app.get('/', (req, res) => {
    console.log(req.method + ' request for url: ' + req.url);
    if (req.query['hub.mode'] == 'subscribe' && req.query['hub.verify_token'] ===
    'tuxedo_cat') {
        res.status(200).send(req.query['hub.challenge']);
    } else {
        res.status(403).end();
    }
});

/* POST for handling all messages (everything else) */
app.post('/', (req, res) => {
    console.log(req.method + ' request for url: ' + req.url);
    if (req.body.object === 'page') {
        req.body.entry.forEach ((entry) => {
            entry.messaging.forEach((event) => {
                if (event.message && event.message.text) {
                    // generate request msg
                    let request = makeRequest(event.message.text);
                    // send msg to Dialogflow and respond to messenger on response
                    sendRequest(request, event);
                }
            });
        });
        res.status(200).end();
    }
});

const request = require('request');

function sendMessage (event, dialogResponse) {
    let sender = event.sender.id;
    let text = event.message.text;
    
    
    request({
        url: 'https://graph.facebook.com/v3.1/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: {text: dialogResponse}
        }
    }, function (error, response) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
    
}

// Dialogflow API - sample code from npm page of Dialogflow library
const projectId = 'chatbot-responder';
// sessionId is arbitrary
const sessionId = 'quickstart-session-id';
const languageCode = 'en-US';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
let privateKey = (process.env.NODE_ENV=="production") ? JSON.parse(process.env.DIALOGFLOW_PRIVATE_KEY) : process.env.DIALOGFLOW_PRIVATE_KEY;
const clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL;
const config = {
    credentials: {
        private_key: privateKey,
        client_email: clientEmail
    }
};
const sessionClient = new dialogflow.SessionsClient(config);

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

function makeRequest(messageText) {
    let request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: messageText,
                languageCode: languageCode,
            },
        },
    };
    return request;
}

function sendRequest(request, event) {
    sessionClient.detectIntent(request).then(responses => {
        const result = responses[0].queryResult;
        sendMessage(event, result.fulfillmentText);
    })
    .catch(err => {
        console.error('DialogFlow ERROR:', err);
        sendMessage(event, event.message.text);
    });
}