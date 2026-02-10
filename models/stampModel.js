const mongoose=require('mongoose');

const stampSchema=new mongoose.Schema({
    type:{
        type:String,
        enum:['Štambilj automat', 
            'Pečat za ovjeru',
            'Štambilj datumar mini',
        'Prijemni pečat',
        'Okrugli pečat-Tradicija i identitet'
        ],
        required:[true,'There should be a type for every stamp']
    },
    price:{
        type:Number,
        required:[true,'Please add a price']
    },
    description:{
        type:String,
        required:[true,'Please add some description']
    },
    advantages:{
        type:[String],
    },
    image:{
        type:String,
        required:[true,'Please add a picture']
    }
});

const Stamp=mongoose.model('Stamp',stampSchema);
module.exports=Stamp;
