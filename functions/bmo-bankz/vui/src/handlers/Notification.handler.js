
var NotificationHandler = {
    
    user: '',
    getUserDetails: function() {
        this.user = this.$user.$data;
        return this.user;
    },
    async Notifications_SummaryIntent() {

        try {
            let user = this.getUserDetails();
            let accountNumber = user.Detail.Login.Account_Number;
            let notes = {};

            if(app.IsAlive) {

                let apiPath = app._GetIntentApiPath(arguments.callee.name);
                
                //BMO-Bankz User Notifications
                var pUserNotifications = app.BmoBankz.connect('GET', apiPath, {
                    headers: {
                    'Account_Number': accountNumber
                    }
                });
                notes.nList = await pUserNotifications.then(function(result){ return result; },
                    function(err){ 
                        console.error(err);
                    }
                );
            } else {

                notes = app.Mock.Notifications;
            }

            this.$speech = app.Speech[user.Locale].Notifications_summaryIntent(notes);
            notes.Reprompt_Message = true;
            this.$reprompt = app.Speech[user.Locale].Notifications_summaryIntent(notes);

            this.followUpState('CreditCardIntentState').ask(this.$speech, this.$reprompt);
        } catch(e) {

            console.error(e);
        }
    }
};

module.exports = NotificationHandler;