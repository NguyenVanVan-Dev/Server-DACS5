const multer  = require('multer')
const path = require('path');

const UploadImage = (fieldname)=>{
    const maxSize = 1*1000*1000 ;
    const   storage = multer.diskStorage({
        destination: './public/uploads/',
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + path.extname(file.originalname);
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })

    const upload = multer({
        storage: storage,
        limits: { fileSize: maxSize },
        fileFilter: function(req, file, cb){
            checkTypeFile(file,cb)
        }
    }).single(fieldname)
    return upload;
}
function checkTypeFile(file,cb){
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null,true);

    }else
    {
        cb({message:'Please chose Image!'})
    }
}  
module.exports = UploadImage;