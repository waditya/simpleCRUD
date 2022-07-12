//Initial libraries to be imported in the codes...

import logo from './logo.svg';
import './App.css';
import {useState} from "react"; 
import Axios from 'axios';

function App() {

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [wage, setWage] = useState(0);

  const [customerList, setCustomerList] = useState([]);
  
  const addCustomer = () => {
    console.log('You are inside addCustomer function!!!');
    Axios.post('http://localhost:3001/create', {
      fname: fname, 
      lname: lname, 
      age: age,
      country: country,
      wage: wage
    }).then(() => {
      console.log("Success!!");
    });
  };

  const getCustomers = () => {
   Axios.get("http://localhost:3001/customers").then((response) => {
      //console.log(response.data.recordset);
      setCustomerList(response.data.recordset);
   }); 
  };
/*   const displayInfo = () => {
    console.log(fname + "\n" + lname + "\n" +age + "\n" + country +  "\n" + wage + "\n");
  }; */

  return (
  <div className="App">
    <div className="information">
      <label>First Name : </label>
        <input 
          type="text" 
          onChange={(event) => {
            setFName(event.target.value);
            }}
          />

      <label>Last Name : </label>
        <input 
          type="text" 
          onChange={(event) => {
            setLName(event.target.value);
            }}
          />    

        <label>Age : </label>
        <input 
        type="number" 
        onChange={(event) => {
          setAge(event.target.value);
          }}
        />

        <label>Country : </label>
        <input 
          type="text" 
          onChange={(event) => {
            setCountry(event.target.value);
            }}
          />

        <label>Annual Wage : </label>
        <input 
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
            }}
          />

        <button onClick={addCustomer} >Add Customer</button>
    </div>
      <hr></hr>
      
      <div className="customers">
        <button onClick={getCustomers}>Show Customers</button>
        
        {customerList.map((val, key) => {
          return (
            <div className="customer">
              <div>
                <h3>Id: {val.id}</h3>
                <h3>First Name: {val.fname}</h3>
                <h3>Last Name: {val.lname}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>
            </div>
          );
        })}
      </div>
      
  </div>
  );
}

export default App;
