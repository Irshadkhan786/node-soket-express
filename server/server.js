/* global imports */
var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var bodyparser = require('body-parser');
var hbs = require('hbs');
var bcrypt = require('bcrypt');
var flash = require('connect-flash');
var session   = require('express-session');
var cookieParser = require('cookie-parser');
var validator = require('validator');
var socket = require('socket.io');
/* local imports */
var http = require('http');
var {mongoose} = require("./db/mongoose");
var {usermodel} = require('./user/user');
var {authenticate,isAuthenticated} = require('./authenticate/authenticate');
var input_validator = require('./utils/inputs-validator');
var paginator = require('./utils/paginator-helper');
var {genMessage} = require('./utils/message');
var {Players} = require('./utils/Players');
var player = new Players();
/* ==socket server setup== */
var app = express();
var server = http.createServer(app);
var io = socket(server);
/* ==pssport setup == */
passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
    function(username, password, cb) {
        
        usermodel.findOne({email:username}, function(err, user) {
           
        if (err) { return cb(err); }
        if (!user) { return cb(null, false,{message:'Incorrect Email'}); }
        var isTrue = bcrypt.compareSync(password, user.password);
       
        if(!isTrue){
            return cb(null, false,{message:'Incorrect Password'});
        }
        return cb(null, user,{message:'Welcome...'});
      });
}));
passport.serializeUser(function(user, cb) {
    cb(null, user);
});
  
passport.deserializeUser(function(user, cb) {
    cb(null, user);
});
/* ==pssport setup ends == */


app.use(cookieParser());
//app.use(session({cookie: { maxAge: 60000 }}));
app.use(session({
    secret: 'secret cat',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyparser.urlencoded({ extended: true })); 
app.use(bodyparser.json());
app.use('/assets', express.static('assets'))
app.use(flash());



app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','hbs');
app.set('title',"App || Login");
const PORT = process.env.PORT || 3000;



/* web routes starts here */
hbs.registerPartials(__dirname+'/views/partials');

app.get('/',(req,res)=>{
    res.render(__dirname+"/views/home.hbs");
})
/* === user login web === */
app.get('/userlogin',(req,res)=>{
   
    var err_mess = req.flash('error')[0];
    res.render(__dirname+'/views/user-login.hbs',{err_mess});
})
app.post('/userlogin',passport.authenticate('local', { 
    failureRedirect: '/userlogin',
    successRedirect: '/getUser',
    failureFlash: true,
    successFlash: true,
    
 }),(req,res)=>{
    res.send(req.body.email);
})
/* == for view user in webpage == */ 
app.get("/getUser",isAuthenticated,(req,res)=>{
   
    /* usermodel.find().skip(0).limit(10).then((succ)=>{
        res.render(__dirname+"/views/user-list.hbs",{status:1,data:succ});
    },(err)=>{
        res.status(404).send()
    }) */
    let dbCon = {};
    let page = parseInt(req.query.page) || 1;
    let per_page = req.query.per_page || 2;
    let skip_value = (page-1)*per_page
    
    usermodel.find(dbCon)
            .skip(skip_value)
            .limit(per_page)
            .exec((err,doc)=>{
                if(err){
                    res.render(__dirname+"/views/user-list.hbs",{status:0,data:{}});
                }
                usermodel.countDocuments(dbCon).exec((count_err,db_count)=>{
                    if(count_err){
                        res.render(__dirname+"/views/user-list.hbs",{status:0,data:{}});
                    }
                    var links  = paginator.userPaginator(db_count,page,per_page);
                    
                    res.render(__dirname+"/views/user-list.hbs",{status:1,data:doc,total_rec:db_count,page_links:links});
                })
            })

   /*  usermodel.find().skip(0).limit(10).then((succ)=>{
        res.render(__dirname+"/views/user-list.hbs",{status:1,data:succ});
    },(err)=>{
        res.status(404).send()
    }) */
})
app.get("/chat",(req,res)=>{

    var username = req.user.name;
    var email = req.user.email;
    var _id = 'abc123';//req.user._id;
    var user_data = {
        name:username,
        email,
        user_id:_id
    }
    res.render(__dirname+"/views/chat.hbs",user_data);
})
app.get("/about",isAuthenticated,(req,res)=>{
    req.session.state_name="Test State Name";
    res.send(req.user);
})

app.get("/contact",isAuthenticated,(req,res)=>{
    res.send(req.session.state_name);
})

app.get("/createUser",isAuthenticated,(req,res)=>{
    if(req.session.user_insert_succ){
        var session_data = req.session.user_insert_succ;
    }else{
        var session_data = '';
    }
    delete req.session.user_insert_succ;
    res.render(__dirname+"/views/create-user.hbs",{ses_res:session_data});
})
app.post("/createUser",isAuthenticated,(req,res)=>{
   
    var reg_err_res = input_validator.reg_form_validator(req.body);
    
    if(reg_err_res.length>0){
        res.render(__dirname+"/views/create-user.hbs",{reg_err_res});
        return false;
    } 
   
    
    var form_fields = {
        'name':req.body.name,
        'email':req.body.email,
        'password':req.body.password,
        'contact':req.body.contact,
        'role':req.body.user_role
    };
    var newUser = new usermodel(form_fields);
    newUser.generateAuthToken().then((token)=>{
        req.session.user_insert_succ = {status:"1",msg:"User saved successfully"};
        res.redirect('/createUser');
    }).catch((e)=>{
        console.log(e);
        /* req.session.user_insert_succ = {status:"0",msg:"Sorry some problem occurred"};
        res.redirect('/createUser'); */
    })
})
app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/userlogin');
})
/* web routes ends here */


/* socket starts here */
io.on('connection',(socket)=>{

    socket.on('send_user_info',(conneced_usr_data,callback)=>{

        var total_count = player.getCount();
        
        if(total_count == 0){
        //add first user in to array
        //send welcome message first user
        var all_players = player.addPlayer(socket.id,conneced_usr_data.name,conneced_usr_data.email);
        socket.emit('welcome_user',{from:'Admin',message:`Hi ${conneced_usr_data.name} Welocome to the Game. Please Wait for 1 more player. Game will Start soon. `,user_det:conneced_usr_data})
        
        
        }else if(total_count == 1){
        //add second user in to array
        //send welcome message second user and start the game
        var all_players = player.addPlayer(socket.id,conneced_usr_data.name,conneced_usr_data.email);
        var card_for_distribution = player.get10RandomCards();
        
        io.emit('welcome_both_user',{from:'Admin',message:`Hi ${conneced_usr_data.name} Welocome to the Game. You are ready to go. `,user_det:all_players})
        io.emit('start_game',{cards:card_for_distribution,users_detl:all_players});
        }
    })
    socket.on('throw_card',(data,calback)=>{
        var check_pass_res = player.compareCards(socket.id,data.card_num,data.card_prio);
        
        io.emit('next_throw_card',{data:check_pass_res});
    })
    console.log(`new user connected`);
    socket.on('disconnect',()=>{
        //remove disconnected user
        var disconnected_user = player.deletePlayer(socket.id);
        var all_user = player.getAllPlayer();
        var blank_all_array = player.resetData();
        io.emit('stop_game',{del_user_det:disconnected_user});
        
    })
})
/* socket ends here */











/* === API starts here === */
app.post('/newuser',(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var contact = req.body.contact;
    var password = req.body.password;
    
    var newUser = new usermodel({
        name,email,contact,password
    });
    
    newUser.generateAuthToken().then((token)=>{
        //res.header({'x-auth':token});
        res.header({'x-auth':token}).send(newUser);
        
    }).catch((err)=>{
        res.status(400).send(err);
    })
    
})
/* == first private route == */
app.get('/user/me',authenticate, (req,res)=>{
    res.send({status:1,data:req.user,text:"life to settle hai"});
})


/* ==for user login == */
app.post('/userLogin',(req,res)=>{

    var user = {'email':req.body.email,'password':req.body.password};
    usermodel.authenticateUser(user.email,user.password).then((valid_user)=>{
        
        return valid_user.res.generateAuthToken().then((token)=>{
            res.header({'x-auth':token}).send(valid_user);
        })
    }).catch((e)=>{
        res.send(e);
    })

})
server.listen(PORT,()=>{
    
    console.log(`Server is runing on port ${PORT}`);
})