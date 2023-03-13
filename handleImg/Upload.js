const multer = require('multer')

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

module.exports = upload;