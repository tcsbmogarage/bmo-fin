var https = require('https');
var config = require('../config');
const fs = require('fs');
var jwtDecode = require('jwt-decode');


var BmoBankz = {
    counter: 0,
    jwt: {
        key: config.Auth0.Jwt.key,
        expiryTime: config.Auth0.Jwt.expiryTime
    },
    async connect(iMethod, iPath, iOptions = {}){
        try {

            let result = {};
            let iToken = 'NULL';
            //Validat the JWT token
            if(!(iOptions && iOptions.m2m === true)) {
                if(this.isExpired(Math.round(new Date().getTime() / 1000))) {
                    jwtObj = await this.refresh(this.jwt.key);
                    var jwtDecoded = jwtDecode(jwtObj.access_token);
                    iToken = this.jwt.key = config.Auth0.Jwt.key = jwtObj.access_token;
                    this.jwt.expiryTime = config.Auth0.Jwt.expiryTime = jwtDecoded.exp;

                    fs.writeFile('../tokens.json', JSON.stringify(this.jwt), (err) => {
                        if (err) throw err;
                        console.log('Tokens saved!');
                    });

                } else {
                    iToken = this.jwt.key;
                }
            }

            let dOptions = {
                method: iMethod.toUpperCase(),
                path: iPath,
                headers:{
                    authorization: 'Bearer ' + iToken,
                },
                json: true
            };

            dOptions.host = config.Bmobankz.Domain;
            let options = Object.assign({}, dOptions, iOptions);
            if(iOptions.headers) {
                options.headers = Object.assign(dOptions.headers, iOptions.headers);
            }
            console.debug(options); //debug
            // API request
            return new Promise((async (resolve, reject) => {
                var debug = {};
                debug.options = options;
                
                var req = await https.request(options, async (res) => {
                    res.setEncoding('utf8');
                    var responseString = "";
                    debug.Response = res;
                    
                    //accept incoming data asynchronously
                    res.on('data', chunk => {
                        switch(options.method) {
                        case "POST":
                            responseString = responseString + chunk;
                            break;
                        default:
                            responseString = responseString + chunk;
                        }
                    });
                    
                    //return the data when streaming is complete
                    res.on('end', async() => {

                        result = JSON.parse(responseString);
                        resolve(result);
                    });
                });

                req.on('timeout', () => {
                    var msg = "Experiencing slow connectivity, Can you please check your network connectivity?";
                    debug.msg = msg;
                    console.error(msg);
                    reject(e); 
                });
                
                req.on('error', (e) => {
                    debug.error = e;
                    console.error(e);
                    reject(e); 
                });
                if(options.method === "POST")
                    req.write(options.json);
                req.end();
            }));
        } catch (e) {
            console.error(e);
        }
    },
    isExpired(cEpoch) {

        return (this.jwt.expiryTime <= cEpoch);
    },
    async refresh(token){

        const data = JSON.stringify({
            "client_id": config.Auth0.Client_Id,
            "client_secret":config.Auth0.Client_Secret,
            "audience":"https://us-central1-bmo-bankz.cloudfunctions.net/api",
            "grant_type":"client_credentials"
        });

        let options = {
            port: 443,
            headers: { 
                'Content-Type': 'application/json',
                'Content-Length': data.length
            },
            json: data,
            m2m: true
        };
        options.host = config.Auth0.Domain;
        var jwtToken = {};
         var oauthPath = '/oauth/token';
            var jwtTokenDetail = app.BmoBankz.connect('POST', oauthPath, options);
            jwtToken = await jwtTokenDetail.then(function(result){ return result; },
            function(err){ return {msg: 'Invalid JWT token, Can you please signin again?'}}
        );

        return jwtToken;
    }
};

module.exports = BmoBankz;
