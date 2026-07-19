//Imports
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";


//Declarations
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const app = express();
const port = process.env.PORT || 3000;
const stocks=[];
const myStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, path.join(_dirname, "public", "images"));
    },
    filename : (req,file,cb)=>{
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const uploadProcessor = multer({ storage: myStorage });


//Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({extended : true}));



//Requests
app.get("/", (req,res)=>{
    res.render("index.ejs",{stocks: stocks});
    
})
app.get("/add",(req,res)=>{
    res.render("add.ejs");
    
})
app.get("/edit-text", (req,res)=>{
    res.render("edit-text.ejs");
})
app.post("/add",uploadProcessor.single("image"),(req,res)=>{
    if(!req.file){
        console.log("No file received!");
        res.send("No file received!");
        return res.redirect("/add");
    }
    const noteText = req.body.note;
    const imagepath = "/images/"+ req.file.filename;

    const newStock ={
        image : imagepath,
        note: noteText
    }
    stocks.push(newStock);
    console.log(req.file.filename);
    console.log(stocks);
    
    res.redirect("/");

})

app.post("/edit-text", (req, res) => {
    const index = req.body.stockIndex; 
    const selectedStock = stocks[index];
    
    
    res.render("edit-text.ejs", { currentNote: selectedStock.note, currentIndex: index });
});
app.post("/update-text", (req, res) => {
    
    const updateIndex = req.body.currentIndex; 
    const updateText = req.body.note;

    //console.log("Trying to update stock at index:", updateIndex);

    
    stocks[updateIndex].note = updateText;
    
    res.redirect("/");
});
app.post("/delete", (req,res)=>{
    const deleteIndex = req.body.delete;
    stocks.splice(deleteIndex,1);
    res.redirect("/");
})

//Listening
app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})