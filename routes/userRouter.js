const {Router} = require('express')
const router = Router();
const { 
    getUsers,
    get_create,
    upload,
    postUser,
    get_one_user,
    patch_one_user,
    delete_one
} = require('../controllers/userController')

router.route('/edit/:id')
    .get(get_one_user)
    .post(upload, patch_one_user) //POST TO patch?

router.route('/delete/:id')
    .get(delete_one) //get to DELETE something?

router
    .route('/add')
    .get(get_create)
    .post(upload,postUser) // <form action="/add"... create.ejs

router
    .route('/')
    .get(getUsers)

module.exports = router