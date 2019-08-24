const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAJ5XX7J5E6QNVKWJA',
  secretAccessKey: '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',
  region: 'us-east-2'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())

const hostname = '127.0.0.1';
const port = 3002;

app.post("/contact", (req, res) => {
  const params = {
    Message: `Your patient, ${req.body.user}, has requested a refill for the following medications: ${req.body.medsForRefill}. ${req.body.message}`, 
    TopicArn: 'arn:aws:sns:us-east-2:018335002742:requestRefill'
  };

  const publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

  publishTextPromise.then(
    function(data) {
      console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
      console.log("MessageID is " + data.MessageId);
    }).catch(
      function(err) {
      console.error(err, err.stack);
    });
    res.json("Success");
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

