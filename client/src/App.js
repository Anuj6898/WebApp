import React from "react";
import { useState } from "react";

function App() {
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [password1 , setPassword1] = useState('')

  async function registerUser(event){
    event.preventDefault()

    const response = await fetch("http://localhost:5000/api/register",{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,email,password,password1,
      })
    })

    const data = await response.json()
  }

  return (

    <div className="App">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input value={name} onChange={(e)=> setName(e.target.value)} type="text"  placeholder="Enter your name" />
        <br />
        <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Enter your email" />
        <br />
        <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password"  placeholder="Enter a password" />
        <br />
        <input value={password1} onChange={(e)=> setPassword1(e.target.value)} type="password"  placeholder="Confirm password" />
        <br />
        <input type="submit" value="Register" />
        <br />
      </form>
    </div>)}

export default App;
