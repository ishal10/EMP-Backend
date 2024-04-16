// Task1: initiate app and run server at 3000
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.listen(3000,()=>{
    console.log("SERVER ACTIVATED")
})

const empModel = require('./MODEL/emp');

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
mongoose.connect("mongodb+srv://ishal:ishal@cluster0.7ixjont.mongodb.net/sampleish?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("DB connected")
})
.catch((err)=>{
    console.log(err)
})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',async(req,res)=>{
    try{
        full_list = await empModel.find()
        res.send(full_list)
    }catch (error){
        console.log(error)
    }
})



//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        specified_data = await empModel.findById(id)
        if(specified_data){
            res.send(specified_data)
        }else{
            res.send({message:"item not founded"})
        }
    } catch (error){
        console.log(error)
    }
})




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist',async(req,res)=>{
    const data = req.body
    console.log(req.body)
    try{
        await empModel(data).save()
        console.log(data)
        res.send({message:"DATA ADDED",data})
    }catch(error){
        console.log(error)
    }
})





//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',async(req,res)=>{
    const id = req.params.id
    try{
        if(empModel.findById(id)){
            await empModel.findByIdAndDelete(id)
            res.send({message:"ITEM DELETED"})
        }else{

            res.send({message:"specified item not founded"})
        }
      
    }catch(error){
        console.log(error)
    }
})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',async(req,res)=>{
    const id = req.body._id
    try{
    const final = await empModel.findByIdAndUpdate(id,req.body)
    final.save();
    res.send("updated")
    } catch (error) {
        console.log(error)
    }
});








//! dont delete this code.+ it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



