import React, { useEffect, useState} from 'react'
import {useParams} from "react-router";
import { GrabStatus } from '../apiCalls';

const PaymentStatus = () => {
   
    const {paymentId}=useParams();
    const [values, setValues]=useState({
        amount:"",
        error:"",
    });

    const {amount,error}=values;

    const getPaymentStatus=(paymentId)=>{
        GrabStatus(paymentId).then((respsonse) => {
            if (respsonse.error) {
              setValues({ ...values, error: respsonse.error, amount: "" });
            } else {
              setValues({ ...values, error: "", amount: respsonse.amount });
            }
          });
    }

    useEffect(()=>{
      getPaymentStatus(paymentId)
  },[paymentId,getPaymentStatus]);

    return (
        <div>
          {error && <h1 style={{ color: "red" }}>{error}</h1>}
          {amount > 0 && (
            <h1 style={{ color: "green" }}>
                Your order of rs {amount / 100} is successfull
            </h1>
            )}
            {!error && !amount && <h1>Loading...</h1>}
        </div>
    )
}

export default PaymentStatus;
