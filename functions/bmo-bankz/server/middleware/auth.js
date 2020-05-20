var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var authCheck = jwt({
  secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: "https://bmo-bankz.auth0.com/.well-known/jwks.json"
  }),
  getToken: function fromHeaderOrQuerystring (req) {
    var result = null;
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        result = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.access_token) {
        result = req.query.access_token;
    }
    return result;
  },
  audience: 'https://us-central1-bmo-bankz.cloudfunctions.net/api',
  issuer: 'https://bmo-bankz.auth0.com/',
  algorithms: ['RS256']
});


module.exports = function() {
    return authCheck;
}