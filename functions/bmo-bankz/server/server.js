// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const app = module.exports = loopback();

var authCheck = jwt({
  secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: "bmo-bankz.auth0.com/.well-known/jwks.json"
  }),
  audience: 'Bmo Bankz',
  issuer: 'https://bmo-bankz.auth0.com/',
  algorithms: ['RS256']
});

//app.use(authCheck);

app.use('/whoami', function(req, res, next){
  res.status(200).json({"It's a valid token": "guest"});
});

app.use(function(err, req, res, next){
    if(err.name === "UnauthorizedError") {
      res.status(401).send('Invalid Token or no token supplied');
    } else {
      res.status(401).send(err);
    }
});
 
app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});