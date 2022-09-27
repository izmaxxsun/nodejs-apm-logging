# Application Performance Monitoring and Log Correlation with NodeJS
## Motivation
The ability to navigate in context between traces, metrics, and logs is extremely powerful.  How does it all work though and how do you setup a quick proof of concept to learn about it yourself or impress your boss?

This walkthrough aims to go through setting this up from soup to nuts, bringing these concepts from buzz to reality.

## Create NodeJS Application
To keep things simple, we'll create an Express server to serve up some static files (think text files and PDFs).

### Setup New Project
* Create a directory
```
mkdir nodejs-apm-logging
```
* Change into your new directory
```
cd nodejs-apm-logging
```
* Initialize a new Node project
```
npm init -y
```
* Create an entry file
```
touch index.js
```
* Install Express as a dependency
```
npm install express --save
```
* Update **package.json** to include a start script which allows you to fire things up with a **npm start** command
```
{
  "name": "usta-proj",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "elastic-apm-node": "^3.38.0",
    "express": "^4.18.1"
  }
}

```
Reference: https://www.digitalocean.com/community/tutorials/nodejs-serving-static-files-in-express

### Add Static Files
Create a **public** directory and add some files to it. Feel free to use documents from this repository.
```
nodejs-apm-logging
  |- index.js
  |- public
    |- 
```

// Add this to the VERY top of the first file loaded in your app
const apm = require('elastic-apm-node').start({
    // Override service name from package.json
    // Allowed characters: a-z, A-Z, 0-9, -, _, and space
    serviceName: 'ams_demo_filerepo',
  
    // Use if APM Server requires a token
    secretToken: '',
  
    // Use if APM Server uses API keys for authentication
    apiKey: 'MWJZclFZTUJvWDhTalo0TGM5czc6R1AwUGtCM1JTRGFFZXVlbVlDUUFjdw==',
  
    // Set custom APM Server URL (default: http://localhost:8200)
    serverUrl: 'https://unicc-k8-test.apm.us-east-2.aws.elastic-cloud.com',
  })

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
