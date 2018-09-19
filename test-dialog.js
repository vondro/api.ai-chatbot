// Dialogflow API - sample code from npm page of Dialogflow library
const projectId = 'chatbot-responder';
// sessionId is arbitrary
const sessionId = 'quickstart-session-id';
const languageCode = 'en-US';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

request = makeRequest("Hello, how are you?");
sendRequest(request);

function makeRequest(messageText) {
    request = {
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

function sendRequest(request) {
    sessionClient.detectIntent(request).then(responses => {
        const result = responses[0].queryResult;
        console.log(result.queryText);
        console.log(result.fulfillmentText);

    })
    .catch(err => {
        console.error('DialogFlow ERROR:', err);
    });
}