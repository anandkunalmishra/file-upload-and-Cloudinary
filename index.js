const express  = require('express');
const app = express();
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    // cloud_name: process.env.CLOUDNAME,
    cloud_name: "diu0dzuph",
    api_key:"151566961183183",
    api_secret:"kPNIAx62USDiH2zqIdQBmEt54t0",


})

app.set('view engine','ejs');

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileupload({
    useTempFiles: true,
    tempFileDir:"/tmp/",
}));


app.get("/myget",(req,res)=>{
    console.log(req.body);

    res.send(req.body);
});
app.post("/mypost",async(req,res)=>{
    console.log(req.body);
    console.log(req.files);
    
    let result;
    let imageArray=[];
    //multiple images 
    if(req.files){
        for (let index = 0; index < req.files.samplefile.length; index++) {
            let result = await cloudinary.uploader.upload(req.files.samplefile[index].tempFilePath,{
                folder: "users",
            });
            imageArray.push({
                
                public_id: result.public_id,
                secure_url: result.secure_url
            })
        }
    }

    //### use case for single image
    // let file = req.files.samplefile;

    // result = await cloudinary.uploader.upload(file.tempFilePath, {
    //     folder: "users",

    // });


    details = {
        firstname: req.body.lastname,
        lastname: req.body.firstname,
        result,
        imageArray,
    }
    console.log(details);
    res.send(details);
});

app.get("/mygetform",(req,res)=>{
    res.render("getform");
})
app.get("/mypostform",(req,res)=>{
    res.render("postform");
})

app.listen(4000,()=>{
    console.log(`Server in running on port 4000`);
});