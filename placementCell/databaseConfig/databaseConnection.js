const mongoose=require("mongoose")

//mongodb connection 

 async function dbConnection(){
try{
await mongoose.connect(process.env.MONGOURL)
console.log("connected to mongoDb")
}

catch(err){
    console.log(err)
}


}


module.exports=dbConnection