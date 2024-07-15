"use client";

import axios from 'axios'
import React from 'react'
import { useState } from 'react'

export default function Employe({params}){
    const [data,setData] = useState([]);
    async function refresh(){
        let id = params.id
        var res = await axios.get("http://127.0.0.1:8080/api/hospitalequipment/"+params.id);
        console.log(res.data)
        setData(res.data)
        return <center><table>
            <tr>
                <th>identyfikator</th>
                <th>Imie</th>
                <th>Nazwisko</th>
                <th>Oddzial</th> 
            </tr>
        </table></center>
      }
    return refresh()
}