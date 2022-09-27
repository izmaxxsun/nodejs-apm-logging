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
    |- file1.text
    |- file2.pdf
```
### Create Express Server
From the **index.js** file, add the following code:
```
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
```
The **express.static** is middleware that serves up static files from the **public** directory.  

### Give the Express Project a Whirl
In your terminal, run the following to launch the project:
```
npm start
```
After it starts, open a web browser and navigate to http://localhost:3000/file.txt and you'll see a file displayed. Or if you're following this code repository, navigate to http://localhost:3000/filerepo/1965/ams_1965_00135.pdf.

## Moving On - Let's Do Some APM
:tada: Good work so far, we have an application running, now we need to monitor it as it gets hammered by our thousands of hungry users.

Continue to [Adding APM](configuring-apm.md).
