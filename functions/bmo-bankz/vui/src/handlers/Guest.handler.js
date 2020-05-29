'use strict'

var GuestHandler = {

    GuestWithRelationship() {
        try {
            let guest = this.$user.$data;
            let device = app.DeviceMaker;
            console.debug('DeviceName: %s', device);
            switch(device) {
                case 'alexa':
                                let msg = app.Speech[guest.Locale].GuestWithRelationship(guest);
                                console.log(msg);
                                this.$speech.addText(msg);
                                this.$alexaSkill.showAccountLinkingCard();
                                this.tell(this.$speech);
                                break;
                case 'google':
                                this.showAccountLinkingCard();
                                break;
            }
        } catch(e) {

            console.error(e);
        }
    },
    GuestWithoutRelationShip() {

        try {

        } catch(e) {

            console.error(e);
        }
    },
    GuestIntentState: {
        
        YesIntent() {
            this.GuestWithRelationship();
        },
        NoIntent() { 
            this.GuestWithoutRelationShip();
        },
        Unhandled() {
            
            this.$reprompt = this.$speech = app.Speech['help'].Help({ Type: 'ConfirmYesNo'});
            this.followUpState('GuestIntentState').ask(this.$speech, this.$reprompt);
        }
    }
};

module.exports = GuestHandler;