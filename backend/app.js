const express=require('express')
const app=express();
const cors=require('cors');
const {Pool}=require('pg')

app.use(express.json());
app.use(cors());

const pool=new Pool({
    user:'postgres',
    host:'localhost',
    password:'password',
    port:5432,
    database:'forms'
})

app.post('/',async(req,res)=>{
    const {fname,lname,dob,gender,email,phoneno,address1,address2,city,state,country,zipcode}=req.body;
    try {
        await pool.query('insert into users values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',[fname,lname,dob,gender,email,phoneno,address1,address2,city,state,country,zipcode]);   
    } catch (error) {
        console.log(error);
    }
    res.json({msg:"posted data"});
})

app.get('/',async(req,res)=>{
    console.log("get 1");
    try {
        const r=await pool.query('select * from users');
        const data=r.rows;
        console.log(data);
        res.json(data);
    } catch (error) {
        console.log(error);
    }
    console.log("get success");
    
})

app.listen(3000,()=>{
    console.log("server is listening to port 3000....");
})