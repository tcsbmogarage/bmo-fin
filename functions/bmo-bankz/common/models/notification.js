'use strict';

module.exports = function(Notification) {

    Notification.summary = function(accountNumber, cb){
        
        try {
                let condition = {
                    where: {
                            User_Account_Number: accountNumber
                           },
                    order: 'Priority',
                    limit: 5
                };
                console.debug(condition); //debug
                Notification.find(condition, function(err, list){
                    if(!err) {
                        let result = list.filter((note) => {
                            console.debug(note); //debug
                            return new Date(note.Expiry_Date) > new Date();
                        });
                        cb(null, list);
                    } else {

                        console.error(err);
                        cb(null, err);
                    }
                });
            } catch(e) {
                
                console.error(e);
            }
        }   

    Notification.remoteMethod('summary',{
        accepts: {arg: 'Account_Number', type: 'string', required: true},
        returns: {type: 'array', root: true},
        http: {path: '/summary', verb: 'get'}
    });
    
};
