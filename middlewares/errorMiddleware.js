const multer=require('multer');

const globalErrorHandler=(err,req,res,next)=>{
    let statusCode=err.statusCode || 500;
    let message=err.message || 'Internal Server Error';
    let status = err.status || 'error';
    if (err.cause) {
        console.error('--- INTERNAL CAUSE ---');
        console.error(err.cause); // This shows you the EXACT DB or Multer error
        console.error('----------------------');
    }
if(err.isOperational){
    return res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
}
   if(err instanceof multer.MulterError){
    statusCode=400;
        switch (err.code) {
            case 'LIMIT_FILE_SIZE':
                message = 'File is too large. Max limit is 5MB.';
                break;
            case 'LIMIT_UNEXPECTED_FIELD':
                message = 'Incorrect field name. Check your "name" attribute.';
                break;
            case 'LIMIT_FILE_COUNT':
                message = 'Too many files uploaded at once.';
                break;
            default:
                message = `Upload error: ${err.code}`;
        }
        res.status(statusCode).json({
            status:'error',
            message:message
        })
}
//for mongoose
if (err.name === 'ValidationError') {
    const msgs = Object.values(err.errors).map(el => el.message).join('. ');
    return res.status(400).json({ status: 'fail', message: msgs });
}


//programming errors:
 else{
    console.error('ERROR:',err);
    res.status(500).json({
        status:'error',
        message:'Something went wrong'
    })

}}
module.exports=globalErrorHandler;