// Dialogflow API - sample code from npm page of Dialogflow library
const projectId = 'chatbot-responder';
// sessionId is arbitrary
const sessionId = 'quickstart-session-id';
const languageCode = 'en-US';


const privateKey = JSON.parse(process.env.DIALOGFLOW_PRIVATE_KEY);

// console.log(privateKey);
const clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL;
const config = {
    credentials: {
        private_key: privateKey,
        client_email: clientEmail
    }
};
console.log(config);

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient(config);

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

let request = makeRequest("Hello");
sendRequest(request);


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
        console.log(result.fulfillmentText);
    })
    .catch(err => {
        console.error('DialogFlow ERROR:', err);
        //sendMessage(event, event.message.text);
    });
}