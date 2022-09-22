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