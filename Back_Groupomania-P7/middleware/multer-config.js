const multer = require('multer');//___ Import the multer middleware for upload the files "images"




const MIME_TYPE = { //_____ Object containing the MIME type of the files that can be uploaded
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/gif': 'gif'
    
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    }
    ,
    filename: (req, file, cb) => {
        console.log("file.originalname: ",file.originalname)
     
        const name = file.originalname.split('.')[0];
    
        const nameFile = name.replace(/\s+/g, '-');
        cb(null, nameFile + Date.now() + '.' + MIME_TYPE[file.mimetype]);//
    }
}
);

module.exports = multer({ storage: storage,  });

