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
    if (!email)
        return false;

    if(email.length>254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return 'Email is in wrong format';

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    console.log(parts)
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    console.log(domainParts)
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}


module.exports = { dataValidation,emailformatvalidation }
