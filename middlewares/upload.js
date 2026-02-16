const express=require('express');
const multer=require('multer');
const path=require('path');
// const upload=multer({dest:'uploads/'})
const storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,'./public/uploads/'),
    filename:(req,file,cb)=>{
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9);
        cb(null,uniqueSuffix+path.extname(file.originalname))
    }
});

const fileFilter=(req,file,cb)=>{
    const allowedTypes=/jpeg|jpg|png|pdf/;
    const allowedMimeTypes=/image\/jpeg|image\/jpg|image\/png|application\/pdf/;
    const extname=allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype=allowedMimeTypes.test(file.mimetype);//multipurpose internet mail extensions is a label used to identify the nature and format of a document
    if(extname && mimetype){
        return cb(null,true);
    }else{
        cb(new Error('Only images(jpeg,jpg,png,gif) are allowed!'));
    }
};




const upload=multer({
    storage:storage,
    limits:{fileSize:1024*1024*5},
    fileFilter:fileFilter
});

module.exports=upload;