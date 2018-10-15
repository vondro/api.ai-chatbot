# api.ai-chatbot

Learning project - simple chatbot written in Node.js using Express.js and Dialogflow API, running in Heroku.

### Heroku deployment hints

#### Configuration of Heroku environment variables
heroku config:add VARIABLE_NAME=variable-value
 - `heroku config:add PAGE_ACCESS_TOKEN=page-access-token-string`

#### Local configuration (Windows PowerShell) [link](https://stackoverflow.com/questions/44360792/unable-to-set-rsa-private-key-as-config-var)
 - `$env:DIALOGFLOW_PRIVATE_KEY='"private key"'` (yes, with double single and double quotes)
 - `$env:DIALOGFLOW_CLIENT_EMAIL="client email"`

#### Problem with Heroku keys
1. do we have some keys?
```
$ heroku keys
```
2. delete all keys
```
$ heroku keys:clear
```
3. generate the key
```
ssh-keygen -t rsa
```
4. add the key
```
heroku keys:add
```
5. -> profit

#### Heroku debugging
[link](https://stackoverflow.com/questions/38568917/how-could-i-debug-a-node-js-app-deploy-on-heroku)

#### Linking Heroku with existing app
```
git remote add heroku git@heroku.com:project_name.git
```