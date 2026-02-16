class AppError extends Error{
    constructor(message,statusCode,name,{cause}={}){
        super(message,{cause});
        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith('4') ? 'fail':'error';
        this.name=this.constructor.name;

        this.isOperational=true;
        Error.captureStackTrace(this,this.constructor);
    }
}










module.exports=AppError;