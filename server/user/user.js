var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var userscheema = mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        minlength:5,
        required:true,
        trim:true,
        validate: {
            validator:function(value){
                return validator.isEmail(value)
            },
            message: '{VALUE} is not a valid email'
        }
    },
    contact:{
        type:String,
        minlength:5,
        required:true,
        trim:true
    },
    created_at:{
        type:Date
    },
    password:{
        type:String,
        minlength:5,
        required:true,
    },
    role:{
        type:Number,
        required:true,
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            require:true
        }
    }]
});

/*==1. Generate Auth Token ==*/
userscheema.methods.generateAuthToken = function(){
    user = this;
    access = "auth";
    var tokenString = {_id:user._id.toHexString(),'access':access};
    var token = jwt.sign(tokenString,'123abc').toString();
    user.tokens.push({access:access,token:token});
    return user.save().then(()=>{
        return token;
    })
}

/* ==2 find by token ==*/
userscheema.statics.findByToken = function(token){

    var USER = this;
    var decoded;
    try{
        decoded = jwt.verify(token,'123abc');
    }catch(e){
        return new Promise((resolve,reject)=>{
            return reject();
        })
    }
    
    return USER.findOne({
        '_id':decoded._id,
        'tokens.access':decoded.access,
        'tokens.token':token
    })
}

/* 3==hashing password == */
userscheema.pre('save',function(next){
   user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            if(salt){
                bcrypt.hash(user.password,salt,(err,passhas)=>{
                    user.password = passhas;
                    next();
                })
            }else{
                next();
            }
        })
    }else{
        next(); 
    }
})

/* 4===login user === */
userscheema.statics.authenticateUser = function(email,password){
    var user = this;
    return user.findOne({email:email}).then((loggedin_user)=>{
        if(!loggedin_user){
            return Promise.reject({'status':'0','res':'Invalid Email'});
        }

        return new Promise((resolve,reject)=>{
            bcrypt.compare(password,loggedin_user.password,(err,res)=>{
               
                if(res){
                    resolve({'status':'1','res':loggedin_user});
                }else{
                    reject({'status':'0','res':'Invalid Password'});
                }

            })
        })
        


    })
}
var usermodel = mongoose.model("User",userscheema);

module.exports = {usermodel};