const dotenv=require('dotenv');
dotenv.config({path:'./.env'});
const app=require('./app');
const mongoose=require('mongoose');


const PORT=process.env.PORT || 3000;

mongoose.connect(process.env.DB)
.then(()=>{
    console.log(`DB connected!`)

    app.listen(PORT,()=>{
        console.log(`SERVER connected to ${PORT}`)
    })

})

.catch(err=>{
    console.log(`Couldn't connect to DB`);
    process.exit(1);
});