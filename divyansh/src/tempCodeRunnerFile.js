import express from 'express'
const app=express()
import cors from 'cors'
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());
let a=[]
app.post("/setdata",(req,res)=>
{
    let {data}=req.body;
    a.push(data);
    console.log(a)

})
app.get("/getdata",(req,res)=>
{
    res.json(a)
})
app.delete('/deletedata',(res,req)=>
{  let {data}=req.body
    a=a.filter((v)=>(v.time!==data))
    console.log(a)
})
app.listen(3000,()=>
{
    console.log("server started")
})