import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import ejs from "ejs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let books=[];


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Capstone 5",
  password: "18110",
  port: 5432,
});

db.connect();



async function get_data() {
    const result = await db.query("select * from book");
    let data = (result.rows);
    data.forEach(element => {       
        books.push(element);
        
    });
    
}

get_data();

app.get("/",(req,res)=>{
    res.render("index.ejs",{
        book:books
    });
});

app.post("/link",async(req,res)=>{
    const data = req.body.datavalue;
    const result = await db.query("select * from book where id = ($1);",[data]);
    const details=(result.rows);
    console.log(details[0].notes);

    
    res.render("notes.ejs",{
        data:details[0]
    });
    
});


app.get("/S_R",async(req,res)=>{

    let sorted_books=[];
    const result = await db.query("select * from book ORDER BY ratings DESC");
    let data = (result.rows);
    data.forEach(element => {       
        sorted_books.push(element);
    })

    res.render("index.ejs",{
        book:sorted_books
    });
        
});


app.get("/S_A",async(req,res)=>{

    let sorted_books=[];
    const result = await db.query("select * from book ORDER BY name ASC");
    let data = (result.rows);
    data.forEach(element => {       
        sorted_books.push(element);
    })

    res.render("index.ejs",{
        book:sorted_books
    });
        
});


app.get("/S_N",async(req,res)=>{

    let sorted_books=[];
    const result = await db.query("select * from book ORDER BY date_read ASC");
    let data = (result.rows);
    data.forEach(element => {       
        sorted_books.push(element);
    })

    res.render("index.ejs",{
        book:sorted_books
    });
        
});


app.listen(port,()=>{
    console.log("PORT 3000 is now opened...");
});





