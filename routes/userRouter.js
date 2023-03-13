const {Router} = require('express')
const router = Router();
const { 
    displayTable,
    createPage,
    postUser,
    deleteUser,
    get_one_user,
    patch_one_user,
} = require('../controllers/userController')

const upload = require('../handleImg/Upload')

// Set the route from most specific to the most general route

router.route('/edit/:id')
    .get(get_one_user)
    .post(upload, patch_one_user) //POST TO patch?

router.route('/delete/:id')
    .get(deleteUser) //get to DELETE something?

router
    .route('/add')
    .get(createPage)
    .post(upload,postUser) // <form action="/add"... create.ejs

router
    .route('/')
    .get(displayTable)

module.exports = router

/*
   1 Why did I use GET request to make a delete action?
   2 why did I use POST request to make a patch action?

  1  index.ejs has an anchor tag
        <a href="" > trash icon 
    
    Let's turn to Express js Docs they define Routing:
    
    Routing refers to determining how an ***app responds to a client
    requests to a particular ENDPOINT***, which is a URI or path
    and a specific HTTP request method

    SO THAT anchor tag should go to an specific URI
    localhost:PORT/delete/:id
    as the definition before says the app should respond
    to a what? in my case to a GET request 
    now in my Controller I extract that ID and so on.

  2 Honestly I do not know it just worked when 
    I switch from PATCH to POST method
    enven in the from HTML element I had to switch
    methods too.
*/