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
        
        //Update account balance

        Accountbalance.updateAccountBalance = function(accountNumber, tAmount, type, cb){
        
            try {

                    const condition = {
                        where: {
                            direct: 1
                        }
                    };

                    Accountbalance.find(condition, function(err, accDetail){
                        var output = [];
                        if(!err) {

                            var accDetailGet = accDetail.where('User_Account_Number', '==', accountNumber);
                            accDetailGet = accDetailGet.limit(1).get();
                            accDetailGet.then((query) => {

                                if (query.exists) {

                                    let completeItem = query.data();
                                    completeItem.id = query.id;
                                    output.push(completeItem);
                                } else {

                                    query.forEach(item => {
                                        let completeItem = item.data();
                                        completeItem.id = item.id;
                                        output.push(completeItem);
                                    });
                                }
                                var amount = parseFloat(tAmount.replace('$', ''));
                                const record = output[0];
                                console.debug(output);
                                const curAmount = parseFloat(record.Amount.replace('$', ''));
                                var newAmount = curAmount;
                                var input = {};
                                input.User_Account_Number = record.User_Account_Number;
                                input.Last_Updated_Time = new Date();
                                switch(type.toLowerCase()) {
                                    case 'credit':
                                                    newAmount = curAmount + amount;
                                                    break;
                                    case 'debit':
                                                    if(curAmount >= amount)
                                                        newAmount = curAmount - amount;
                                                    else
                                                        throw new Error("Insufficient Account Balance");
                                                    break;
                                }
                                input.Amount = '$' + newAmount.toFixed(2);
                                console.debug(input)
                                accDetail.doc(record.id).update(input).then(function(){
                                    
                                    cb(null, {'status': 'updated'})
                                });
                            })
                            .catch(err => cb(err));
                        } else {

                            console.error(err);
                            cb(err, null)
                        }
                    });               
                } catch(e) {
                    
                    console.error(e);
                    cb(e, {'status': e.Message});
                }
        }
    
        Accountbalance.remoteMethod('getAccountBalance',{
            accepts: {arg: 'Account_Number', type: 'string', required: true},
            returns: {type: 'array', root: true},
            http: {path: '/getAccountBalance', verb: 'get'}
        });

        Accountbalance.remoteMethod('updateAccountBalance',{
            accepts: [
                        {arg: 'Account_Number', type: 'string', required: true},
                        {arg: 'Amount', type: 'string', required: true},
                        {arg: 'Transaction_Status', type: 'string', required: true},
                     ],
            returns: {type: 'array', root: true},
            http: {path: '/updateAccountBalance', verb: 'patch'}
        });

};
