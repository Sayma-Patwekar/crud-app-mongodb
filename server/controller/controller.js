//we require model.js in the controller file
var Userdb = require('../model/model');

//create and save new user
exports.create = (req,res)=> {
    //validate user
    if(!req.body){  //if user send an empty body request
        res.status(400).send({message : "Content can not be empty"});
        return;
    }

    //new user 
    // creates new instance of Userdb and store it in user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })
    //save user(data) in database
    user
        .save(user)         //( .save() method is used to save data in database
        .then(data => {     //promise
            console.log("Connection successful");
            res.send(data)  
        })
        .catch(err => {     //if some error occured
            res.status(500).send({
                message : err.message || "Some error occurewd while creating a create operation" //if error msg is not displayed display this default msg
            });
        });

}



//retriev and return all users/retrieve and return a single user
exports.find = (req,res) => {
    Userdb.find()   //using find() method on Userdb object
    .then(user => {
        res.send(user)  //return found user
    })
    .catch(err => {
        res.status(500).send({message : err.message || "Error occured while retrieving user information"})
    })
}

//update a new identified user by user id
exports.update = (req,res) => {
    if(!req.body){
        return res.status(400).send({message : "Data to update can not be empty"})
    }

    const id = req.params.id; //retrieving id from parameters of requests
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify : false})
    .then(data => {
        if(!data){
            res.status(404).send({message : `Cannot update user with ${id}. Maybe user not found! `})
        }
        else{
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message : "Error Update user information"})
    })

}

//de;ete a user with specifies user id in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message : `Cannot delete with this id ${id}. May be id is wrong`})
        }
        else{
            res.send({
                message: "User deleted successfully!"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not del;ete User with id =" + id
        });
    });
}