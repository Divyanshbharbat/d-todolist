import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let a = [];

// Add data
app.post("/setdata", (req, res) => {
    let { data } = req.body;
    a.push(data);
    console.log(a);
    res.json({ success: true, message: 'Data added successfully' });
});

// Get data
app.get("/getdata", (req, res) => {
    res.json(a);
});

// Delete data
app.post('/deletedata', (req, res) => {
    let {time } = req.body;
    console.log(time)
    a = a.filter((v) => v.time !==time);
    console.log(a);
    res.json({ success: true, message: 'Item deleted successfully' });
});

// Start server
app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});
