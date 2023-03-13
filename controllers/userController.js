const User = require("../models/User");
const multer = require('multer')
const fs = require('fs')

let storage = multer.diskStorage({
    destination: function (request, file, callback) {
      //callback(,path (folder) were we will move the image)
        callback(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

let upload = multer({storage}).single('image') //name attribute = image

const getUsers = async (req,res) => {
    User.find().sort({createdAt: -1}).then(result => {
        res.render('index', {myTitle: 'Home', users: result}) 
    }).catch(err => console.log(err))
}

const get_create = async (req,res) => { res.render('create', {myTitle: 'Create User'}) }

const postUser = async (req,res) => { 
    console.log('************************* REQ BODY  POST METHOD **')
    console.log(req.body) 
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename
    })
    user.save()
    .then(() => {
        res.redirect('/')
    })
    .catch(err => console.log(err))
}
const get_one_user = async (req,res) => { 
    const id = req.params.id;
    User.findById(id)
    .then(result => {
        res.render('edit', {myTitle: 'Edit Blog', user: result})
    })
    .catch(err => {
        console.log(err);
    })
 }

 const patch_one_user = (req,res) => { 
    const id = req.params.id;
    console.log('************************* REQ BODY  PATCH METHOD **')
    console.log(req.body)
    let new_image = '';
    if(req.file){
        new_image = req.file.filename;
        try{
            fs.unlinkSync(`./uploads/${req.body.old_image}`) // name attribute on the form
        } catch(err) {console.log(err)}
    } else{
        new_image = req.body.old_image;
    }

    User.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: new_image
    }, {new: true}).then(result => {
        console.log(result); return res.redirect('/')
    }).catch(err => console.log(err))
}

const delete_one = (req,res) => { 
    const id = req.params.id;
    User.findByIdAndRemove(id).then(result => {
        if(result.image != ''){
            try{
                fs.unlinkSync(`./uploads/${result.image}`)
            } catch(err) {console.log(err)}
        }
        res.redirect('/')
    }).catch(err => console.log(err))
 }

module.exports = {
    getUsers,
    get_create,
    upload,
    postUser,
    get_one_user,
    patch_one_user,
    delete_one
}