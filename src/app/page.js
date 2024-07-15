'use client'

import { useEffect,useState } from 'react'
import React from 'react'
import axios from 'axios'
import { redirect } from "next/navigation";





export default function Home() {
  var options = "";
  useEffect(() => {
    if (document.readyState !== 'complete') {
      const handler = () => {
        console.log('load');
        refresh(false);
      };
      window.addEventListener('load', handler);

      return () => {
        window.removeEventListener('load', handler);
      };
    } else {
      const timeout = window.setTimeout(() => {
        console.log('timeout');
        refresh(false);
      }, 0);
      return () => window.clearTimeout(timeout);
    }
  }, []);

  function backto(){
    setIsDetails(true);
    refresh()
  }

  async function filteredWorkers(){
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var ward = document.getElementById("ward").value;
    console.log(id,name,surname,ward)
      if(id != "" || name != "" || surname != "" || ward != ""){

      
      
      await getData();
      setFilteredData(data.filter(
        (el) => Object.keys(el).some((parameter) => el[parameter] == options[parameter]
        )))
      console.log(data);
      setIsStart(false);
    }else{
      setIsStart(true);
    }
  }

  async function getData(){
    await refresh();
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var ward = document.getElementById("ward").value;
    ward = ward.toUpperCase()
    if(id && name && surname && ward){
      options = {
        id: id,
        name: name,
        surname: surname,
        ward: ward
      }
    }if(name && surname && ward){
      options = {
        
        name: name,
        surname: surname,
        ward: ward
      }
    }if(surname && ward){
      options = {
        surname: surname,
        ward: ward
      }
    }if(id){
      options = {
        id: id,
      }
    }if(name){
      options = {
        name: name,
      }
    }if(surname){
      options = {
        surname: surname,
      }
    }if(ward){
      options = {
        ward: ward
      }
    }
  }
  
  async function neww(){
    var tag = event.target.className
    console.log(tag)
    setClient(tag);
    console.log(client)
    setIsDetails(false);
    let id = tag;
    console.log(client)
    console.log("http://127.0.0.1:8080/api/hospitalequipment/"+id)
    var res = await axios.get("http://127.0.0.1:8080/api/hospitalequipment/"+id);
    console.log(res.data)
     setDetails(res.data)
     setIsModalDetails(true)
     loadDataOfWorkerClothes();
     
    return <center><table>
        <tr>
            <th>identyfikator</th>
            <th>Imie</th>
            <th>Nazwisko</th>
            <th>Oddzial</th> 
        </tr>
    </table></center>
  }

  function modalHandler() {
    if(isModalDetails){
      setIsModalDetailsStart(!isModalDetailsStart);
    } else {
    setIsModal(!isModal);}
  }

  function addNewWorkerHandler(){
    var name = document.getElementById("newName").value;
    var surname = document.getElementById("newSurname").value;
    var ward = document.getElementById("newWard").value;
    axios.post("http://127.0.0.1:8080/api/hospitalequipment", {
      name: name,
      surname: surname,
      ward: ward,})
    refresh();
    modalHandler();
  }

  async function loadDataOfWorkerClothes(){
    let data = await axios.get("http://127.0.0.1:8080/api/listofworkersclothes")
    setDataOfWorkersClothes(data)
  }

  const [filteredData,setFilteredData] = useState([]);
  const [data,setData] = useState([]);
  const [dataOfWorkersClothes,setDataOfWorkersClothes] = useState([]);
  const [filteredDataOfWorkersClothes,setFilteredDataOfWorkersClothes] = useState([]);
  const [details,setDetails] = useState({
    "id": 10,
    "name": "Adolf",
    "surname": "Kowalski",
    "ward": "LORT"
});
  const [client,setClient] = useState();
  const [isStart,setIsStart] = useState(true);
  const [isModal,setIsModal] = useState(false);
  const [isModalDetails,setIsModalDetails] = useState(true);
  const [isModalDetailsStart,setIsModalDetailsStart] = useState(false);
  const [isDetails,setIsDetails] = useState(true);
  async function refresh(){
    console.log("click")
    var res = await axios.get("http://127.0.0.1:8080/api/hospitalequipment");
    console.log(res.data)
    setData(res.data)
  }

  var detailsClient = (<table><tr>
    <td> {details.id}</td>
    <td> {details.name} </td>
    <td> {details.surname} </td>
    <td> {details.ward} </td>
  </tr></table>)

var show = data.map(data => (
  <tr id={data.id} key={data.id}>
    <td> {data.name} </td>
    <td> {data.surname} </td>
    <td> {data.ward} </td>
    <td> <a  onClick={(e) => neww()} className={data.id}>Szczegóły</a> </td>
  </tr>

))
var showFiltered = filteredData.map(filteredData => (
        
  <tr id={filteredData.id} key={filteredData.id}>
    <td> {filteredData.name} </td>
    <td> {filteredData.surname} </td>
    <td> {filteredData.ward} </td>
    <td> <a  onClick={(e) => neww()} className={filteredData.id}>Szczegóły</a> </td>
  </tr>

))

  return (
    <div>
      {isDetails ? <div className='main'>
      <center>
      <div className='form'>
      <input id='id' type="number" placeholder="Wpisz identyfikator"></input>
      <input id='name' type="text" placeholder="Wpisz imie"></input>
      <input id='surname' type="text" placeholder="Wpisz nazwisko"></input>
      <input type='text'  id='ward' name="wards" placeholder="Wpisz oddzial"></input>
      <button onClick={(e) => filteredWorkers()} >Wyszukaj</button>
      </div><br></br>
      <div id='show'>
      {isStart ? <table><tr><th>Imie</th>
          <th>Nazwisko</th>
          <th>Oddzial</th> <th>Wiecej</th>
          </tr>{show}</table> : <table><tr><th>Imie</th>
          <th>Nazwisko</th>
          <th>Oddzial</th> <th>Wiecej</th></tr>{showFiltered}</table> }
      </div>
      </center>
      </div>: <center><div><button onClick={backto}>Powrót do listy</button>
        {detailsClient}</div>{isModalDetailsStart ? <div className='ModalBox'><h1>Wpisz dane zdarzenia</h1>
      <input id='newName' type='text' placeholder='Wpisz imie pracownika'></input>
      <input id='newSurname' type='text' placeholder='Wpisz nazwisko pracownika'></input>
      <input id='newWard' type='text' placeholder='Wpisz oddział pracownika'></input><br></br>
      <button onClick={modalHandler} className='modalClose'>X</button>
      </div> : <div></div>}</center>}
      {isModal ? <div className='ModalBox'><h1>Wpisz dane nowego pracownika</h1>
      <input id='newName' type='text' placeholder='Wpisz imie pracownika'></input>
      <input id='newSurname' type='text' placeholder='Wpisz nazwisko pracownika'></input>
      <input id='newWard' type='text' placeholder='Wpisz oddział pracownika'></input><br></br>
      <button onClick={addNewWorkerHandler}>Zatwierdz</button>
      <button onClick={modalHandler} className='modalClose'>X</button>
      </div> : <div className='modal'> {isModalDetails ? 
        <h1 className='modaltitle' onClick={modalHandler}>+</h1> : <h1 className='modaltitle' onClick={modalHandler}>+</h1>
      }
      </div>}
      
    </div>
  );
}
