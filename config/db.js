const mongoose=require('mongoose');
const db= ()=>{
    mongoose.connect(process.env.DATABASE_CONNECTION)
    .then(()=>{
        console.log("Veritabanına bağlandı");
    })
        .catch((err)=>{
        console.log("Veritabanına bağlanamadı"+err)
        })
}

module.exports=db; 