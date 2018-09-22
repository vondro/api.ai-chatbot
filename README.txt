Configuration of Heroku environment variable:
heroku config:add PAGE_ACCESS_TOKEN=page-access-token-string

Local configuration (Windows PowerShell):
$env:DIALOGFLOW_PRIVATE_KEY="private key"
$env:DIALOGFLOW_CLIENT_EMAIL="client email"

Problem with Heroku key:
// do we have some keys?
$ heroku keys

// delete all keys
$ heroku keys:clear

// generate the key
$ ssh-keygen -t rsa

// add the key
$ heroku keys:add

// -> profit

Heroku debugging:
https://stackoverflow.com/questions/38568917/how-could-i-debug-a-node-js-app-deploy-on-heroku

Linking Heroku with existing app:
git remote add heroku git@heroku.com:project_name.git