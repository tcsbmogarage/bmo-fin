'use strict';

module.exports = function(Payee) {

    //Private functions

    Payee._run = function(query, cb) {

        var response = [];
        try {

            query.get().then(snapshot => {
                if (snapshot.exists) {
                    let completeItem = snapshot.data();
                    completeItem.id = snapshot.id;
                    response.push(completeItem);
                } else {
                    snapshot.forEach(item => {
                        let completeItem = item.data();
                        completeItem.id = item.id;
                        response.push(completeItem);
                    });
                }
            }).then(() => cb(null, response)).catch(err => cb(err, err))

        } catch(e) {

            console.error(e);
        }
    }
    
    //Get Payee details by short name

    Payee.getPayeeDetailsByShortName = function(accountNumber, shortName, cb){
        
        try {
            let condition = {
                where: {
                        direct: 1,
                        User_Account_Number: accountNumber,
                        Payee_Short_Name: shortName
                       },
                limit: 1
            };
            console.debug(condition); //debug

            Payee.find(condition, function(err, query){
                if(!err) {
                    query = query.where("User_Account_Number", "==", condition.where.User_Account_Number);
                    query = query.where("Payee_Short_Name", "==", condition.where.Payee_Short_Name);

                    query = query.limit(condition.limit);
                    
                    Payee._run(query, cb);
                } else {

                    console.error(err);
                    cb(null, err);
                }
            });
        } catch(e) {
            
            console.error(e);
        }
    }


    Payee.updateSafeZone = function(accountNumber, shortName, isASafeZonePayee, cb){
        
        try {
            let condition = {
                where: {
                        direct: 1,
                        User_Account_Number: accountNumber,
                        Payee_Short_Name: shortName
                       },
                limit: 1
            };
            console.debug(condition); //debug

            Payee.find(condition, function(err, query){
                if(!err) {
                    let sQuery = query.where("User_Account_Number", "==", condition.where.User_Account_Number);
                    sQuery = sQuery.where("Payee_Short_Name", "==", condition.where.Payee_Short_Name);

                    sQuery = sQuery.limit(condition.limit);

                    sQuery.get()
                    .then(function(querySnapshot) {
                    
                        if(!querySnapshot.empty) {

                            querySnapshot.forEach(function(doc) {

                                let data = doc.data();
                                data.Is_A_Safe_Zone_Payee = isASafeZonePayee;

                                //Update the safe-zone entity
                                query.doc(doc.id).update(data)
                                .then(() => cb(null, {Status: 'Success'}))
                                .catch(err => cb(err));
                            });
                        } else {

                            cb(null, {Status: 'InvalidPayee'});
                        }
                    })
                    
                } else {

                    console.error(err);
                    cb(null, err);
                }
            });
        } catch(e) {
            
            console.error(e);
        }
    }
    
    //Remote Methods

    Payee.remoteMethod('getPayeeByShortName',{
        accepts: [
                  {arg: 'User_Account_Number', type: 'string', required: true},
                  {arg: 'Source_Account_Short_Name', type: 'string', required: true}
                 ],
        returns: {type: 'object', root: true},
        http: {path: '/getPayeeByShortName', verb: 'get'}
    });

    Payee.remoteMethod('updateSafeZone',{
        accepts: [
                  {arg: 'User_Account_Number', type: 'string', required: true},
                  {arg: 'Payee_Short_Name', type: 'string', required: true},
                  {arg: 'Is_A_Safe_Zone_Payee', type: 'string', required: true}
                 ],
        returns: {type: 'object', root: true},
        http: {path: '/updateSafeZone', verb: 'post'}
    });
};
