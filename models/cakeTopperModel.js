const mongoose=require('mongoose');

const cakeTopperSchema=new mongoose.Schema({
    type:{
        type:String,
        enum:['Wedding cakeTopper', 
            'Birthday cakeTopper with Numbers',
            'Birthday cakeTopper',
        'Christening cakeTopper',
        'Holly cakeTopper communion',
        'Anniversary cakeTopper',
        'Graduation cakeTopper',
        'Other cakeTopper'
        ],
        required:[true,'There should be a type for every cakeTtopper']
    },
    material:String,
    productType:String,//like stamp,cakeTopper etc
    price:{
        type:Number,
        required:[true,'Please add a price']
    },
    image:{
        type:String,
        required:[true,'Please add a picture']
    },
    size:{
        type:String,
    }
});

const CakeTopper=mongoose.model('CakeTopper',cakeTopperSchema);
module.exports=CakeTopper;
