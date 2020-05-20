var https = require('https');
var jwtDecode = require('jwt-decode');
var config = require('../config');

var Auth0 = {
   
    async connect(iMethod, iPath, iToken, iOptions = {}){
        let result = {};
        let dOptions = {
            method: iMethod.toUpperCase(),
            path: iPath,
            headers:{
                authorization: 'Bearer ' + iToken,
            },
            json: true
        };
        dOptions.host = config.Auth0.Domain;
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
                                    process.stdout.write(chunk);
                                    break;
                        default:
                            console.log(chunk);
                            responseString = responseString + chunk;
                        }
                });
                
                //return the data when streaming is complete
                res.on('end', () => {
                    
                    result = JSON.parse(responseString);
                    if(result.hasOwnProperty(config.Auth0.User_Metadata_Path)) {
                        result.User_Metadata = result[config.Auth0.User_Metadata_Path];
                        delete result[config.Auth0.User_Metadata_Path];
                    }
                    if(result.hasOwnProperty(config.Auth0.User_CardNumber_Path)) {
                        result.Login_Card_Number = result[config.Auth0.User_CardNumber_Path];
                        delete result[config.Auth0.User_CardNumber_Path];
                    }
                    console.log(result);
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
    }
};

module.exports = Auth0;
