function dataValidation(first_name,last_name,zip,zip1){
    const value  = parseInt(zip);
    const value1 = parseInt(zip1)
    if(typeof first_name != 'string'){
        return "first_name is in wrong format"
    }
    else if( typeof last_name != 'string'){
        return "last_name is in wrong format"
    }
    else  if(isNaN(value)){
        return 'Zip code is in wrong format'
    }
    else if(zip1 && isNaN(value1) ){
        return 'Zip1 code is in wrong format'
    }
    else{
        return true
    }  
}

function emailformatvalidation(email){
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if(!email.match(emailRegex)){
        return true;
    }else{
        return 'Email format is wrong'
    } 
}


module.exports = { dataValidation,emailformatvalidation }
