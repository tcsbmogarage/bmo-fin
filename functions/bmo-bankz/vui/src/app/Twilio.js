var twilio = require('twilio');
var config = require('../config');

var Twilio = {

    sendTransOTP(to, details, cb) {

        var client = new twilio(config.Twilio.AccountSID, config.Twilio.AuthToken);
        const warn = "OTPs are SECRET. DO NOT disclose it to anyone.";
        const intro = "is your One Time Password for your initiated transaction";
        var msg = details.OTP + " " + intro + " $" + details.Amount + " on your account number XX" + details.AccountNumber + ". " + warn;
        const options = {
            body: msg,
            to: config.Twilio.CountryCode + to,
            from: config.Twilio.From
        };
        console.debug(options);
        if(config.Twilio.isEnabled) {

            client.messages.create(options)
            .then((message) => { 
                
                console.log(message.sid);
            })
            .catch((err) => console.error(err) )
            .finally(() => console.debug("Initiated for OTP!") );
        }
    },
    sendPayeeOTP(to, details, cb) {

        var client = new twilio(config.Twilio.AccountSID, config.Twilio.AuthToken);
        const warn = "OTPs are SECRET. DO NOT disclose it to anyone.";
        const intro = "is your One Time Password for your initiated transaction";
        var msg = details.OTP + " " + intro + " on your account number XX" + details.AccountNumber + ". " + warn;
        const options = {
            body: msg,
            to: config.Twilio.CountryCode + to,
            from: config.Twilio.From
        };
        console.debug(options);
        if(config.Twilio.isEnabled) {

            client.messages.create(options)
            .then((message) => { 
                
                console.log(message.sid);
            })
            .catch((err) => console.error(err) )
            .finally(() => console.debug("Initiated for OTP!") );
        }
    }

};

module.exports = Twilio;