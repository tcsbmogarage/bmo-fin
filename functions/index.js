const functions = require('firebase-functions');
const api = require('./bmo-bankz/server/server');
const { Webhook, GoogleCloudFunction } = require('jovo-framework');
const { app } = require('./bmo-bankz/vui/src/app.js');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.api = functions.https.onRequest(api);
exports.vui = functions.https.onRequest((request, response) => {
    app.handle(new GoogleCloudFunction(request, response));
});