
var TransactionHandler = {
    
    user: '',
    getUserDetails: function() {
        this.user = this.$user.$data;
        return this.user;
    },
    async AccountBalances_getAccountBalanceIntent() {

        try{

            let user = this.getUserDetails();
            let accountNumber = user.Detail.Login.Account_Number;
            let trans = {};

            if(app.IsAlive) {

                let apiPath = app._GetIntentApiPath(arguments.callee.name);
                
                //BMO-Bankz user account balance
                var pAccountBalance = app.BmoBankz.connect('GET', apiPath, {
                    headers: {
                    'Account_Number': accountNumber
                    }
                });
                trans.list = await pAccountBalance.then(function(result){ return result; },
                    function(err){ 
                        console.error(err);
                    }
                );
            } else {

                trans = app.Mock.AccountBalances_getAccountBalanceIntent;
            }

            trans.Reprompt_Message = false;
            this.$speech = app.Speech[user.Locale].AccountBalances_getAccountBalanceIntent(trans);
            trans.Reprompt_Message = true;
            this.$reprompt = app.Speech[user.Locale].AccountBalances_getAccountBalanceIntent(trans);

            this.followUpState('UserWelcomeIntent').ask(this.$speech, this.$reprompt);
        } catch(e) {

            console.error(e);
        }
    },
    AccountBalanceState: {

        YesIntent() {

            this.GetTransactionList();
        },
        NoIntent() { 

            this.$reprompt = this.$speech = app.Speech['help']._ATE({ Emotion: 'Sad'});
            this.followUpState("UserWelcomeIntentState").ask(this.$speech, this.$reprompt);
        },
        Unhandled() {

            this.$reprompt = this.$speech = app.Speech['help'].Help({ Type: 'ConfirmYesNo'});
            this.followUpState('AccountBalanceState').ask(this.$speech, this.$reprompt);
        }
    }
};

module.exports = TransactionHandler;