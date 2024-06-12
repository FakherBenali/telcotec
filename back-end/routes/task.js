const express = require('express');

const router = express.Router();


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const Task = require('../Models/task');

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

router.post('/save' ,upload.fields([{ name: 'photo' }]) , (req,res)=>{
     
    let data = req.body;
    console.log(data);

    let task = new Task(data)
    if (req.files['photo'] ) {
        // Assuming __filename contains the path of uploaded files
        task.photo = req.files['photo'][0].path;
    }
    
    console.log(task);


    task.save()
        .then(
            (savedtask)=>{
                __filename = '';
                res.status(200).send(savedtask);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})


router.get('/all' , (req,res)=>{
    Task.find({})
    .then(
        (tasks)=>{
            res.status(200).send(tasks);
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

    Task.findOne({_id : id})
    .then(
        (task)=>{
            res.status(200).send(task);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})

router.delete('/:id' , (req,res)=>{

    let id = req.params.id;

    Task.findByIdAndDelete({_id : id})
        .then(
            (task)=>{
                res.status(200).send(task);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})

router.put('/update/:id', upload.fields([{ name: 'photo' }]), (req, res) => {
    let taskId = req.params.id;
    let updatedData = req.body;

    Task.findById(taskId)
        .then(task => {
            if (!task) {
                return res.status(404).send({ message: "Task not found" });
            }

            // Update task properties
            task.name = updatedData.name || task.name;
            task.location = updatedData.location || task.location;
            task.description = updatedData.description || task.description;
            task.number = updatedData.number || task.number;
            task.price = updatedData.price || task.price;

            // Update photo if exists
            if (req.files['photo']) {
                task.photo = req.files['photo'][0].path;
            }

            return task.save();
        })
        .then(updatedTask => {
            res.status(200).send(updatedTask);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});



module.exports = router ;