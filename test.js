// Dialogflow API - sample code from npm page of Dialogflow library
const projectId = 'chatbot-responder';
// sessionId is arbitrary
const sessionId = 'quickstart-session-id';
const languageCode = 'en-US';


const privateKey = (process.env.NODE_ENV=="production") ? JSON.parse(process.env.DIALOGFLOW_PRIVATE_KEY) : process.env.DIALOGFLOW_PRIVATE_KEY;
// console.log(privateKey);
const clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL;
const config = {
    credentials: {
        private_key: privateKey,
        client_email: clientEmail,
        type: "service_account",
        project_id: "chatbot-responder",
        client_id: "105888423457608601255",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/dialogflow-uwkfyp%40chatbot-responder.iam.gserviceaccount.com"
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