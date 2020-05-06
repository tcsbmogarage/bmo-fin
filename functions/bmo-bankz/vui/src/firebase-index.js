'use strict';


const { Webhook, GoogleCloudFunction } = require('jovo-framework');
const { app } = require('./app.js');

exports.handler = async (req, res) => {
    await app.handle(new GoogleCloudFunction(req, res));
};
