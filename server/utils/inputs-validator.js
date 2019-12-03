var validator = require('validator');

var reg_form_validator = (reg_inputs)=>{

    let name = reg_inputs.name;
    let email = reg_inputs.email;
    let password = reg_inputs.password;
    let conf_password = reg_inputs.conf_password;
    let contact = reg_inputs.contact;
    let user_role = reg_inputs.user_role;

    var err_arr = Array();

    if(validator.isEmpty(name,{ignore_whitespace:true})){
        err_arr.push({'err_input':'name',err_desc:'Name is required'});
    }
    if(!validator.isAlphanumeric(name,'en-US')){
        err_arr.push({'err_input':'name',err_desc:'Name Should be Alphanumeric.'});
    }

    if(validator.isEmpty(email,{ignore_whitespace:true})){
        err_arr.push({'err_input':'email',err_desc:'Email is required'});
    }
    if(!validator.isEmail(email)){
        err_arr.push({'err_input':'email',err_desc:'This is not an valid Email Address'});
    }

    
    if(validator.isEmpty(password,{ignore_whitespace:true})){
        err_arr.push({'err_input':'password',err_desc:'Password is required'});
    }
    if(!validator.isAlphanumeric(password,'en-US')){
        err_arr.push({'err_input':'password',err_desc:'Password Should be alphanumeric.'});
    }
    if(password !== conf_password){
        err_arr.push({'err_input':'password',err_desc:'Password and Confirm Password are not same'});
    }

    if(validator.isEmpty(contact,{ignore_whitespace:true})){
        err_arr.push({'err_input':'email',err_desc:'Contact is required'});
    }
    if(!validator.isNumeric(contact)){
        err_arr.push({'err_input':'email',err_desc:'Contact Should be numeric'});
    }

    if(validator.isEmpty(user_role,{ignore_whitespace:true})){
        err_arr.push({'err_input':'role',err_desc:'Role is required'});
    }
    if(!validator.isNumeric(user_role)){
        err_arr.push({'err_input':'role',err_desc:'Role Should be numeric'});
    }

    return err_arr;
}

module.exports = {
    reg_form_validator
}