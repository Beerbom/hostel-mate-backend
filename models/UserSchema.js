const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema=new Schema(
    {
        Name:{
            type:String,
            required:true
        },
        PhoneNo:{
            type:String,
            required:true
        },
        Email:{
            type:String,
            required:true
        },
        Gender:{
            type:String,
            required:true
        },
        Degree:{
            type:String
        },
        AdmNo:{
            type:String,
            required:true,
            unique: true
        },
        YearOfStudy:{
            type:String,
            required:true
        },
        Branch:{
            type:String,
            required:true
        },
        PAddress1:{
            type:String,
            required:true
        },
        PAddress2:{
            type:String,
            required:true
        },
        PPincode:{
            type:String,
            required:true
        },
        Distance:{
            type:String,
        },
        PDistrict:{
            type:String,
            required:true
        },
        PState:{
            type:String,
            required:true
        },
        PCountry:{
            type:String,
            required:true
        },
        Adhar:{ 
            type:String,
            required:true
        },
        RAddress1:{
            type:String,
            // required:true
        },
        RAddress2:{
            type:String
        },
        RPincode:{
            type:String,
            // required:true
        },
        RDistrict:{
            type:String
        },
        RState:{
            type:String
        },
        RCountry:{
            type:String
        },
        Income:{
            type:String,
            required:true
        },
        IncomeCertificate:{ 
            type: String ,
            required:true
        },
        GName:{
            type:String,
            required:true
        },
        GPhoneNo:{
            type:String,
            required:true
        },
        Relation:{
            type:String,
            required:true
        },
        GAddress1:{
            type:String,
            // required:true
        },
        GAddress2:{
            type:String
        },
        GPincode:{
            type:String,
            // required:true
        },
        GDistrict:{
            type:String
        },
        GState:{
            type:String
        },
        GCountry:{
            type:String
        },
        Priority:{
            type:String,
            required:true
        }
    }
)
module.exports=mongoose.model('student',UserSchema)