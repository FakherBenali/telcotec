


const express = require('express');

const router = express.Router();

const User = require('../Models/user');
const Agent = require('../Models/agent');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const permission = require('../Models/permission');

__filename = '';
const mystorage = multer.diskStorage({

    destination: './uploads',
    filename: (req , file ,cb)=>{
        let date = Date.now(); 

        let fl = date + '.' + file.mimetype.split('/')[1];
        cb(null , fl);
        __filename = fl;
    }
})
 
const upload = multer({storage: mystorage});

router.post('/register' , upload.fields([{ name: 'logo' }, { name: 'rne' }, { name: 'patente' }]) , (req,res)=>{
     
    let data = req.body;
    let user = new User(data)
    // if (req.files['logo'] && req.files['rne'] && req.files['patente']) {
    //     // Assuming __filename contains the path of uploaded files
    //     user.logo = req.files['logo'][0].path;
    //     user.rne = req.files['rne'][0].path;
    //     user.patente = req.files['patente'][0].path;
    // }
    user.banned_date = new Date('3000-01-01').getTime();
    user.activate_date = new Date('2000-01-01').getTime();

    console.log(user);

    salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(data.password , salt);

    user.save()
        .then(
            (savedUser)=>{
                __filename = '';
                res.status(200).send(savedUser);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})

router.post('/login' , (req,res)=>{
    
    let data = req.body;

    Agent.findOne({email: data.email})
        .then(
            (user)=>{
                // let valid = bcrypt.compareSync(data.password , user.password);
                let valid = data.password == user.password;
                if(!valid){
                    res.status(400).send({'message': 'email or password invalid'});
                }
                else{
                    let payload = {
                        _id: user._id,
                        email: user.email
                    };
                    let token = jwt.sign(payload , '123456789');
                    console.log(token);
                    
                    // if( user.permissions 
                    res.status(200).send({ mytoken: token  , permissions: user.permissions , isadmin: user.email == "fvrbntrl@gmail.com" });
                }
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )
})

router.get('/all' , (req,res)=>{
    User.find({})
    .then(
        (users)=>{
            res.status(200).send(users);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})

router.get('/getbyid/:id' , (req,res)=>{
    let id = req.params.id;

    User.findOne({_id : id})
    .then(
        (user)=>{
            res.status(200).send(user);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})

router.delete('/supprimer/:id' , (req,res)=>{

    let id = req.params.id;

    User.findByIdAndDelete({_id : id})
        .then(
            (user)=>{
                res.status(200).send(user);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})


router.get('/banned/:id' , (req,res)=>{

    let id = req.params.id;

    User.findOne({_id : id})
    .then(
        (user)=>{
            const now = new Date(); // Get the current date and time
            user.banned_date = now.getTime() + 10 * 24 * 60 * 60 * 1000;
            user.save();
            res.status(200).send(user);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})



router.get('/suspend/:id' , (req,res)=>{

    let id = req.params.id;

    User.findOne({_id : id})
    .then(
        (user)=>{
            const now = new Date("3000-01-01"); // Get the current date and time
            user.banned_date = now.getTime();
            user.save();
            res.status(200).send(user);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})


router.get('/activate/:id/:date' , (req,res)=>{

    let id = req.params.id;
    let date = req.params.date;

    User.findOne({_id : id})
    .then(
        (user)=>{
            const now = new Date(); // Get the current date and time
            user.banned_date = now.getTime();
            user.activate_date = date;
            user.save();
            res.status(200).send(user);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})




module.exports = router ;