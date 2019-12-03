var {usermodel} = require('../user/user')

var authenticate = (req,res,next)=>{
    var token = req.header('x-auth');
    usermodel.findByToken(token).then((succ)=>{
        if(!succ){
            return new Promise().reject();
        }
        req.token = token;
        req.user = succ;
        next();
    }).catch((e)=>{
        res.status(401).send(e)
    })
}

var isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/userlogin');
    }
}
module.exports = {
    authenticate,isAuthenticated
}