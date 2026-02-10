const Stamp=require('../models/stampModel.js');
const fs=require('fs');
const stampData=JSON.parse(fs.readFileSync('./dataJson/stamp.json'))


exports.createAllStamps=async(req,res)=>{
    await Stamp.deleteMany();
    const stamps=await Stamp.create(stampData);
    if(!stamps) return new Error(`Couldn't create all the stamps, somethiong is wrong with the data provided`);
    console.log(stamps);
    res.status(201).json({
        status:'success',
        result:stamps.length,
        data:stamps
    })
}

exports.showAllStamps=async(req,res)=>{
    const stamps=await Stamp.find();
    if(!stamps)return new Error('There is no stamps to show');
    res.status(200).json({
        status:'success',
        result:stamps.length,
        data:stamps
    })
}