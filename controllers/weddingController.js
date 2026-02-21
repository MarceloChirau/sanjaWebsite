const Wedding=require('../models/cakeTopperModel.js');
const fs=require('fs');
const weddingData=JSON.parse(fs.readFileSync('./dataJson/weddingTopper.json'));

exports.createAllWeddingToppers=async(req,res)=>{
    await Wedding.deleteMany();
    const wedding=await Wedding.create(weddingData);
    if(!wedding) return new Error(`Couldn't create all the wedding toppers, somethiong is wrong with the data provided`);
    console.log(wedding);
    res.status(201).json({
        status:'success',
        result:wedding.length,
        data:wedding
    })
}

exports.showAllWeddingToppers=async(req,res)=>{
    const wedding=await Wedding.find();
    if(!wedding)return new Error('There is no stamps to show');
    res.status(200).json({
        status:'success',
        result:wedding.length,
        data:wedding
    })
}