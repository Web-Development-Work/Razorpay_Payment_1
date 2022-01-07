import React, { useState, useEffect } from "react";
import  {GetOrder}  from "./apiCalls";


const App = () => {

  const REACT_APP_DATA_KEY="rzp_test_1yzUNDIxi0JAWA"
  const [values, setValues] = useState({
    amount: 0,
    orderId: "",
    error: "",
    success: false,
  });

  const { amount, orderId, success, error } = values;
  
 
  const createOrder = () => {
    GetOrder().then((response) => {
      if(response.error){
        setValues({ ...values, error, success });
      }else{
        setValues({
          ...values,
          error:"",
          success:true,
          orderId:response.id,
          amount:response.amount,
        })
      }
    });
  };

  useEffect(() => {
    createOrder();
  }, []);

  

  const showRazoryPay = () => {
    const form = document.createElement("form");
    form.setAttribute("method", "GET");
    form.setAttribute(
      "action",
      `http://localhost:4000/api/payment`
    );
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.setAttribute("data-key",REACT_APP_DATA_KEY);
    script.setAttribute("data-amount", amount);
    script.setAttribute("data-name", "Anil Patidar");
    script.setAttribute("data-prefill.contact", "9630196313");
    script.setAttribute("data-prefill.email", "abc@gmail.com");
    script.setAttribute("data-order_id", orderId);
    script.setAttribute("data-prefill.name", "Anil Patidar");
    script.setAttribute("data-image", `http://localhost:4000/api/logo`);
    script.setAttribute("data-buttontext", "Buy NOW!!!");
    document.body.appendChild(form);
    form.appendChild(script);
    const input = document.createElement("input");
    input.type = "hidden";
    input.custom = "Hidden Element";
    input.name = "hidden";
    form.appendChild(input);
  };
  useEffect(() => {
    console.log(amount);
    console.log(orderId);
    if (amount > 0 && orderId !=="") {
      showRazoryPay();
    }
  }, [showRazoryPay]);
 
  return (
  <div>
    {amount === 0 && orderId === "" && 
    <h1>Loading...</h1>}
    </div>
    );
};

export default App;