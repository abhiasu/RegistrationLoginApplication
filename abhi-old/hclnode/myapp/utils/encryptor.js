var encryptor = require('simple-encryptor')('SyCYni-sETqnanY2T9MWuAuCdesdfsfwe');

exports.encrypt = function(data){
 return encryptor.encrypt(data);
}

exports.decrypt = function(data){
 return encryptor.decrypt(data);
}
