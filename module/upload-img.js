const multer = require('multer');

const {v4:uuidv4} = require('uuid');

const extMap = {
    'image/jpeg':'.jpg',
    'image/png':'.png',
    'image/gif':'.gif',
}

const fileFilter =  (req,file,cb)=>{
    cb(null,!!extMap[file.mimetype]);
};

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,__dirname + '/../public/imgs');
    },
    filename:(req,file,cb)=>{
        const name = uuidv4();
        const fileExt = extMap[file.mimetype];
        cb(null,name + fileExt);
    }
})
module.exports =  multer({fileFilter, storage});