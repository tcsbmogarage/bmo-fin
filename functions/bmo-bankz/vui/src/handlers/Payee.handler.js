
var PayeeHandler = {
    
    user: '',
    getUserDetails: function() {

        this.user = this.$user.$data;
        return this.user;
    },
    getInput(ctx, param) {

            let result = '';
            if(typeof app.DeviceMaker === "undefined")
                app.DeviceMaker = app._GetDeviceName(ctx);
            
            try {
                switch(app.DeviceMaker) {
                    //Amazon
                    case "alexa":
                            if(ctx.$inputs[param])
                                result = ctx.$inputs[param].value;
                        break;
                    //Google
                    case "google":
                            if(ctx.$inputs[param])
                                result = ctx.$inputs[param].key;
                        break;
                    default:
                }
            } catch(e) {

                console.error(e);
            }
            console.debug(ctx.$inputs);
            console.debug("param: " + param + " Value:" + result);
            return result;
    },
    async updateSafeZone(ctx, input, callback) {

        try {

            let user = ctx.getUserDetails();
            let userDetailId = user.Oauth.User_Metadata.User_Detail_Id;
            let trans = {};

            if(app.IsAlive) {

                let apiPath = app._GetIntentApiPath("Payees_updateSafeZone");
                const data = JSON.stringify(input);
                var options = {
                    port: 443,
                    headers: { 
                        'Content-Type': 'application/json',
                        'Content-Length': data.length
                    },
                    json: data,
                    m2m: false
                };
                //BMO-Bankz user account balance
                var pPayee = app.BmoBankz.connect('POST', apiPath, options);
                trans.list = await pPayee.then(function(result){ return result; },
                    function(err){ 
                        console.error(err);
                    }
                );
            } else {

                trans.list = app.Mock.Payees_updateSafeZone;
            }
            return callback(null, trans);
        } catch(e) {

            console.error(e);
            return callback(e, null);
        }
    },
    async Payees_updateSafeZone() {

        try {

            let user = this.getUserDetails();
            let accountNumber = user.Detail.Login.Account_Number;

            let stop = false;

            //Compile input
            var input = {};
            input.User_Account_Number = accountNumber;
            input.Payee_Short_Name = this.getInput(this, "ShortName");
            input.Is_A_Safe_Zone_Payee_Given = this.getInput(this, "IsASafeZonePayee").toLocaleLowerCase();

            if(input.Is_A_Safe_Zone_Payee_Given === "mark") {

                input.Is_A_Safe_Zone_Payee = "true";
            } else if(input.Is_A_Safe_Zone_Payee_Given === "unmark") {

                input.Is_A_Safe_Zone_Payee = "false";
            } else {

                stop = true;
            }
            console.debug(input);

            input.Reprompt_Message = false;
            this.$speech = app.Speech[user.Locale].Payees_updateSafeZone(input);

            input.Reprompt_Message = true;
            this.$reprompt = app.Speech[user.Locale].Payees_updateSafeZone(input);

            //Generate 4 digit OTP
            input.OTP = Math.floor(1000 + Math.random() * 9000);
            input.AccountNumber = user.Detail.Login.Account_Number.substr(user.Detail.Login.Account_Number.length - 4);
            input.MobileNumber = user.Oauth.User_Metadata.Mobile_Number;
            this.setSessionAttributes(input);

            app.Twilio.sendPayeeOTP(input.MobileNumber, input, function() { 

            });
            this.followUpState('PayeeState').ask(this.$speech, this.$reprompt);

        } catch(e) {

            console.error(e);
        }
    },
    PayeeState: {

        async UserFourDigitCode() {

            let user = this.getUserDetails();
            let input = this.getSessionAttributes();
            this.$user.$data.LastFourDCode = this.$inputs.FourDigit.value;
            var cfdCode = this.$user.$data.LastFourDCode;
            //Api specific names
            input.User_Account_Number = user.Detail.Login.Account_Number;
            console.debug(input);
            const actualCode = input.OTP;
            var dType = {};

            console.debug("GivenFourDigit: [%s]", this.$user.$data.LastFourDCode);
            console.debug("Actual OTP: [%s]", actualCode);
            if(actualCode == cfdCode) {

                dType.LastFourDCode = actualCode;
                await this.updateSafeZone(this, input, (err, details) => {
                    if(!err) {

                        details.Is_A_Safe_Zone_Payee_Given = input.Is_A_Safe_Zone_Payee_Given;
                        console.debug(details);
                        dType = { Type: 'EndCard', Scenario: details.list.Status};
                        frameDetails = Object.assign({}, input, dType);
                    } else {

                        console.error(err);
                        dType = { Type: 'EndCard', Scenario: 'InternalServerError' };
                        frameDetails = Object.assign({}, input, dType);
                    }
                    this.$reprompt = this.$speech = app.Speech[user.Locale].PayeesHelp(frameDetails);
                    this.followUpState("UserWelcomeIntentState").ask(this.$speech, this.$reprompt);
                });
                
            } else {

                this.$reprompt = this.$speech = app.Speech[user.Locale].PayeesHelp({Type: 'Validation', Scenario: 'Invalid4DCode'});
                this.followUpState("PayeeState").ask(this.$speech, this.$reprompt);
            }
        },
        YesIntent() {

        },
        NoIntent() { 

            this.$reprompt = this.$speech = app.Speech['help']._ATE({ Emotion: 'Sad'});
            this.followUpState("UserWelcomeIntentState").ask(this.$speech, this.$reprompt);
        },
        Unhandled() {

            this.$reprompt = this.$speech = app.Speech['help'].Help({ Type: 'ConfirmYesNo'});
            this.followUpState('PayeeState').ask(this.$speech, this.$reprompt);
        }
    }
};

module.exports = PayeeHandler;