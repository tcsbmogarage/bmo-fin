var https = require('https');
var config = require('../config');

var BmoBankz = {
    async connect(iMethod, iPath, iToken, iOptions = {}){
        let result = {};
        let dOptions = {
            method: iMethod,
            path: iPath,
            headers:{
                authorization: 'Bearer ' + iToken,
            },
            json: true
        };
        let options = Object.assign(dOptions, iOptions);
        options.host = config.Bmobankz.Domain;
        console.log(options);
        // API request
        return new Promise(((resolve, reject) => {
            var debug = {};
            debug.options = options;
            
            var req = https.request(options, res => {
                res.setEncoding('utf8');
                var responseString = "";
                debug.Response = res;
                
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
                
                //accept incoming data asynchronously
                res.on('data', chunk => {
                    console.log(chunk);
                    responseString = responseString + chunk;
                });
                
                //return the data when streaming is complete
                res.on('end', () => {
                    debug.status = "Completed"
                    console.debug(debug);
                    result = JSON.parse(responseString);
                    console.log(result);
                    resolve(result);
                });
            });
            req.end();
        }));
    }
};

module.exports = BmoBankz;
