
const GetOrder =async()=>{
    return await fetch(`http://localhost:4000/api/createorder`, {
        method:"GET",
    })
    .then((response)=>response.json())
    .catch((err)=>console.log(err));
};


const GrabStatus =async(paymentId)=>{
    return await fetch(`http://localhost:4000/api/payments/${paymentId}`, {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        },
    })
    .then((response)=>response.json())
    .catch((err)=>console.log(err));
};

export {GetOrder, GrabStatus};