'use strict'

var CreditCardHandler = {

    user: '',
    getUserDetails: function() {
        this.user = this.$user.$data;
        return this.user;
    },
    GetACreditCard() {
        try {

            let user = this.getUserDetails();
            let msg = app.Speech[user.Locale].GetACreditCard();
            let next = app.Speech['help']._ATE();
            this.$speech.addText(msg);
            this.$speech.addText(next);
            this.$reprompt = next;
            this.followUpState('UserWelcomeIntentState').ask(this.$speech, this.$reprompt);
        } catch(e) {

            console.error(e);
        }
    },
    CreditCardIntentState: {
        
        YesIntent() {

            this.GetACreditCard();
        },
        NoIntent() { 

            this.$reprompt = this.$speech = app.Speech['help']._ATE({ Emotion: 'Sad'});
            this.followUpState("UserWelcomeIntentState").ask(this.$speech, this.$reprompt);
        },
        Unhandled() {

            this.$reprompt = this.$speech = app.Speech['help'].Help({ Type: 'ConfirmYesNo'});
            this.followUpState('CreditCardIntentState').ask(this.$speech, this.$reprompt);
        }
    }
};

module.exports = CreditCardHandler;