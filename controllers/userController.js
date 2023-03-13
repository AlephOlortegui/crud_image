const User = require("../models/User");
const fs = require('fs');
const { listenerCount } = require("../models/User");

const displayTable = async (req,res) => { 
    try {
        const users = await User.find().sort({createdAt: -1})
        res.render('index', {myTitle: 'Home', users}) 
    } catch (error) {
        console.log(err)
    }
}

const createPage = (req,res) => { 
    res.render('create', {myTitle: 'Create User'}) 
}

const postUser = async (req,res) => { 
    try {
        const {name,email,phone} = req.body
        await User.create({
            name,
            email,
            phone,
            image: req.file.filename
        })
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
}

const deleteUser = async (req,res) => { 
    try {
        const id = req.params.id;
        const userRemoved = await User.findByIdAndRemove(id)
        if(userRemoved.image != ''){
            try{
                fs.unlinkSync(`./uploads/${result.image}`)
            } catch(err) {console.log(err)}
        }
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
 }


const get_one_user = async (req,res) => { 
    try {
        const id = req.params.id;
        const userToEdit = await User.findById(id)
        if(!userToEdit){
            throw Error('No user found')
        }
        return res.render('edit', {myTitle: 'Edit Blog', user: userToEdit})
    } catch (err) {
        console.log(err.message)
    }
 }

 const patch_one_user = async (req,res) => { 
    try {
        const {id} = req.params
        const {name,email,phone} = req.body
        let new_image = '';

        if(req.file){
            new_image = req.file.filename;
            try{
                fs.unlinkSync(`./uploads/${req.body.old_image}`) // name attribute on the form
            } catch(err) {console.log(err)}
        } else{
            new_image = req.body.old_image;
        }

        const userUpdated = await User.findByIdAndUpdate({_id:id}, {
            name,
            email,
            phone,
            image: new_image
        })

        if(!userUpdated){
            throw Error('No user found')
        }
        return res.redirect('/')
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    displayTable,
    createPage,
    postUser,
    deleteUser,
    get_one_user,
    patch_one_user,
}