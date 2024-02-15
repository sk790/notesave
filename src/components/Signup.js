import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const host = "http://localhost:5000/api/auth"
  const {showalert} = props;
  const [detail, setdetail] = useState({ Name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate()
  const onchange = (e) => {
    setdetail({ ...detail, [e.target.name]: e.target.value })
  }
  const submit = async (e) => {
    e.preventDefault();
    if (detail.password === detail.cpassword) {
      const response = await fetch(`${host}/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Name: detail.Name, email: detail.email, password: detail.password })
      });
      const json = await response.json();
      if (json.success) {
        showalert(json.msg,"success")
        navigate('/login')

      } else {
        showalert(json.msg,"danger")
      }
    }else{
      showalert("Confirm password not match","danger")
    }

  }

  return (
    <div className='container my-3'>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Enter Name</label>
          <input type="text" className="form-control" minLength={3} name='Name' id="name" onChange={onchange} value={setdetail.Name} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="exampleInputEmail1" onChange={onchange} value={setdetail.email} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" minLength={5} className="form-control" value={setdetail.password} onChange={onchange} name='password' id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" minLength={5} className="form-control" onChange={onchange} name='cpassword' value={setdetail.cpassword} id="cpassword" />
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
