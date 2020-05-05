import React, {useEffect, useState} from "react";
import axios from 'axios';
import ReceiptCard from './ReceiptCard.js';

export default function ReceiptList(){
    const [receipt, setReceipt] = useState([]);


    useEffect(()=>{
        axios
        .get('https://receipt-tracker-api.herokuapp.com/users/receipts')
        .then(res =>{
            console.log('receipt', res.data.results);
            setReceipt(res.data.results);
        })

        .catch(error =>{
            console.log(error);
        })
    }, []);

    return (
        <section className="receipt-view">
        {receipt.map(recep =>{
            return<ReceiptCard key={recep.id} recp={recep}/>
        })}
        </section>

    )
}