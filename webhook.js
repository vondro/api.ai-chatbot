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
app.get('/webhook', (req, res) => {
    console.log(req.method + ' request for url: ' + req.url);
    if (req.query['hub.mode'] == 'subscribe' && req.query['hub.verify_token'] ===
    'tuxedo_cat') {
        res.status(200).send(req.query['hub.challenge']);
    } else {
        res.status(403).end();
    }
});

/* POST for handling all messages (everything else) */
app.post('/webhook', (req, res) => {
    console.log(req.method + ' request for url: ' + req.url);
    if (req.body.object === 'page') {
        req.body.entry.forEach ((entry) => {
            entry.messaging.forEach((event) => {
                if (event.message && event.message.text) {
                sendMessage(event);
                }
            });
        });
    res.status(200).end();
    }
});

const request = require('request');

function sendMessage (event) {
    let sender = event.sender.id;
    let text = event.message.text;
    

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: ***REMOVED***},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: {text: text}
        }
    }, function (error, response) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });

}

/* Poznamky:
- stara verze nodejs -> update
- kontrolovat, jake requesty mi chodi z fb/messengeru
- permanentnejsi adresa - hodit na pankrecik?
- next step - dokopat, aby fungovaly jednoduche odpovedi
- nastudovat hello world express.js
*/