'use strict';

module.exports = function(Accountbalance) {

        //Get Account Balance

        Accountbalance.getAccountBalance = function(accountNumber, cb){
        
            try {
                    let condition = {
                        where: {
                                User_Account_Number: accountNumber
                               },
                        limit: 1
                    };
                    console.debug(condition); //debug
                    Accountbalance.find(condition, function(err, res){
                        if(!err) {
                            let result = res;
                            cb(null, result);
                        } else {
                            
                            console.error(err);
                            cb(null, err);
                        }
                    });
                } catch(e) {
                    
                    console.error(e);
                }
            }   
    
        Accountbalance.remoteMethod('getAccountBalance',{
            accepts: {arg: 'Account_Number', type: 'string', required: true},
            returns: {type: 'array', root: true},
            http: {path: '/getAccountBalance', verb: 'get'}
        });

};
