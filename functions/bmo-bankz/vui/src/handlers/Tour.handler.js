'use strict'

var TourHandler = {
    
    user: '',
    getUserDetails: function() {
        this.user = this.$user.$data;
        return this.user;
    },
    StartTourIntent() {

        let msg = "";

        this.getUserDetails();

        if(this.user.Detail.Is_Tour_Completed) {

            this.tell('You are already completed the tour');
        } else {
            
            msg = app.Speech[this.user.Locale].StartTourIntent(this.user.Detail);
            this.$speech.addText(msg);
            this.$reprompt = app.Speech['help']._HCHY({Emotion: 'Default'});
            this.$user.$data.Detail.Is_Tour_Completed = true;

            this.followUpState("UserWelcomeIntentState").ask(this.$speech, this.$reprompt);
        }
    },
    TourIntentState: {

        YesIntent() {
            this.StartTourIntent();
        },
        NoIntent() { 
            this.$user.$data.Detail.Is_Tour_Completed = true;
            this.$reprompt = this.$speech = app.Speech['help']._HCHY({ Emotion: 'Sad'});
            this.followUpState("UserWelcomeIntentState").ask(this.$speech, this.$reprompt);
        },
        Unhandled() {

            this.$reprompt = this.$speech = app.Speech['help'].Help({ Type: 'ConfirmOkNotOk'});
            this.followUpState('TourIntentState').ask(this.$speech, this.$reprompt);
        }
    }
};

module.exports = TourHandler;