'use strict'
var Notification = require('../../../common/models/notification');
var NotificationHandler = {

    NotificationIntent() {
            Notification.remoteMethod('test', {});
            this.ask('Notification Intent');
    }
};

module.exports = NotificationHandler;