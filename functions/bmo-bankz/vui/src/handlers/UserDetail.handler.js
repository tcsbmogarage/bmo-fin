
var UserDetailHandler = {
    
    user: '',
    getUserDetails: function() {
        this.user = this.$user.$data;
        return this.user;
    },
    getInputIfExists(ctx, param, value) {

        let result = value;
        if(ctx.$inputs && ctx.$inputs[param] && ctx.$inputs[param].value)
            if(ctx.$inputs[param].value.length > 0)
                result = ctx.$inputs[param].value;

        return result;
    },
    async UserDetails_getCCDetails() {

        try{

            let user = this.getUserDetails();
            let details = {};

            if(app.IsAlive) {

                details.list = user.Detail.BMO_Credit_Cards;
            } else {

                details.list = app.Mock.UserDetails_getCCDetails;
            }

            //CCInfo
            if(this.$inputs.CCInfo)
                details.ccInfo = this.$inputs.CCInfo.value;
            else
                details.ccInfo = 'all';

            //CCInfoIntent
            if(this.$inputs.CCInfoIntent)
                details.ccInfoIntent = this.$inputs.CCInfoIntent.value;
            else
                details.ccInfoIntent = 'all';

            details.Reprompt_Message = false;
            this.$speech = app.Speech[user.Locale].UserDetails_getCCDetails(details);

            details.Reprompt_Message = true;
            this.$reprompt = app.Speech[user.Locale].UserDetails_getCCDetails(details);

            this.followUpState('UserWelcomeIntent').ask(this.$speech, this.$reprompt);
        } catch(e) {

            console.error(e);
        }
    },
    async payCCBill(ctx, input, callback) {

        try {

            let user = ctx.getUserDetails();
            let userDetailId = user.Oauth.User_Metadata.User_Detail_Id;
            let trans = {};

            if(app.IsAlive) {

                let apiPath = app._GetIntentApiPath("UserDetails_payCcBill");
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

                //options.headers = input;

                //BMO-Bankz user account balance
                var pClearCcBill = app.BmoBankz.connect('POST', apiPath, options);
                trans.list = await pClearCcBill.then(function(result){ return result; },
                    function(err){ 
                        console.error(err);
                    }
                );
            } else {

                trans = app.Mock.UserDetails_payCcBill;
            }
            return callback(null, trans);
        } catch(e) {

            console.error(e);
            return callback(e, null);
        }
    },
    async UserDetails_payCcBill() {

        try {

            let user = this.getUserDetails();
            let input = user.Detail.BMO_Credit_Cards[0];

            var details = {};

            if(input.Credit_Card_Due_Amount != "$0.00") {

                input.Default = input.Default.toString();
                input.User_Account_Number = user.Detail.Account_Numbers[0].Account_Number;
                input.User_Detail_Id = user.Oauth.User_Metadata.User_Detail_Id;
                details.Reprompt_Message = false;
                details.Credit_Card_Due_Amount = input.Credit_Card_Due_Amount;
                details.CCAmount = this.getInputIfExists(this, 'DueAmount', details.Credit_Card_Due_Amount);
                if(!details.CCAmount.match(/\$/g))
                    details.CCAmount = '$' + details.CCAmount;
                input.Credit_Card_Pay_Amount = details.CCAmount;

                this.$speech = app.Speech[user.Locale].UserDetails_payCcBill(details);

                details.Reprompt_Message = true;
                this.$reprompt = app.Speech[user.Locale].UserDetails_payCcBill(details);

                this.setSessionAttributes(input);
                this.followUpState('UserPayCCState').ask(this.$speech, this.$reprompt);

            }  else {

                details = { Type: 'EndCard', Scenario: 'NoOutstanding' };
                details.LastFourDCode = input.Credit_Card_Number.substr(input.Credit_Card_Number.length - 4);

                this.$reprompt = this.$speech = app.Speech[user.Locale].UserDetailsHelp(details);
                this.followUpState("UserWelcomeIntentState").ask(this.$speech, this.$reprompt);
            }       

        } catch(e) {

            console.error(e);
        }
    },
    UserPayCCState: {

        async UserFourDigitCode() {

            let user = this.getUserDetails();
            let input = this.getSessionAttributes();
            this.$user.$data.LastFourDCode = this.$inputs.FourDigit.value;
            var cfdCode = this.$user.$data.LastFourDCode;
            const actualCode = input.Credit_Card_Number.substr(input.Credit_Card_Number.length - 4)

            console.debug("GivenFourDigit: [%s]", this.$user.$data.LastFourDCode);
            console.debug("Actual: [%s]", actualCode);
            if(actualCode == cfdCode) {

                let dType = { Type: 'EndCard', Scenario: 'SuccessCCPayment' };
                dType.LastFourDCode = actualCode;
                await this.payCCBill(this, input, (err, details) => {
                    dType.Credit_Card_Pay_Amount = input.Credit_Card_Pay_Amount;
                    frameDetails = Object.assign({}, details.list.BMO_Credit_Cards[0], dType);
                    this.$reprompt = this.$speech = app.Speech[user.Locale].UserDetailsHelp(frameDetails);
                    //Uddate local db
                    this.$user.$data.Detail.BMO_Credit_Cards = details.list.BMO_Credit_Cards;
                    this.followUpState("UserWelcomeIntentState").ask(this.$speech, this.$reprompt);
                });
                
            } else {

                this.$reprompt = this.$speech = app.Speech[user.Locale].UserDetailsHelp({Type: 'Validation', Scenario: 'Invalid4DCode'});
                this.followUpState("UserFourDigitCode").ask(this.$speech, this.$reprompt);
            }
        },
        YesIntent() {

            console.debug('Yes Intent from UserPayCCState');
        },
        NoIntent() { 

            this.$reprompt = this.$speech = app.Speech['help']._ATE({ Emotion: 'Sad'});
            this.followUpState("UserWelcomeIntentState").ask(this.$speech, this.$reprompt);
        },
        Unhandled() {

            this.$reprompt = this.$speech = app.Speech['help'].Help({ Type: 'ConfirmFourDigit'});
            this.followUpState("UserPayCCState").ask(this.$speech, this.$reprompt);        
        }
    },
    UserDetailState: {

        YesIntent() {

            
        },
        NoIntent() { 

            this.$reprompt = this.$speech = app.Speech['help']._ATE({ Emotion: 'Sad'});
            this.followUpState("UserWelcomeIntentState").ask(this.$speech, this.$reprompt);
        },
        Unhandled() {

            this.$reprompt = this.$speech = app.Speech['help'].Help({ Type: 'ConfirmYesNo'});
            this.followUpState('UserDetailState').ask(this.$speech, this.$reprompt);
        }
    }
};

module.exports = UserDetailHandler;