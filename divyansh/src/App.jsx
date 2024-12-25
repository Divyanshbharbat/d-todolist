import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import "./App.css"
import axios from 'axios';

const App = () => {
    const { register, handleSubmit, reset,formState:{errors} } = useForm();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getdata();
    }, []);

    const handledelete = async (time) => {
        try {console.log(time)
            await axios.post("http://localhost:3000/deletedata", {time });
            getdata();
        } catch (err) {
            console.log(err);
        }
    };

    const onsubmit = async (data) => {
        try {
            await axios.post("http://localhost:3000/setdata", { data });
            reset();
            getdata();
        } catch (err) {
            console.log(err);
        }
    };

    const getdata = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getdata");
            setCart(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="wrapper">
            <div className="head">
                <h1>Divyansh Todo List</h1>
            </div>
            <div className="content">
              <h2>  {(cart.length) > 0 ? "Your Function" : "Add Your Function" }</h2>
                {cart.map((item) => (
                    <div key={item.time}>
                     <div className="list">
                    <span> {item.time} </span> 
                  <textarea id="id">
                    {item.work}
                  </textarea>
                     
                     </div>
                        <div className="btn">
                        <button onClick={() => handledelete(item.time)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="creator">
                <form onSubmit={handleSubmit(onsubmit)}>
                    <h2>Enter your time</h2>
                    <input type="time" {...register("time", { required: true })} />
                    <h2>Enter your work</h2>
                    <input type="text" {...register("work", { required: true })} />
                   <div className="btn">
                   <button type="submit">Submit</button>
                   </div>
                </form>
            </div>
        </div>
    );
};

export default App;
