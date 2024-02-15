import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const host = "http://localhost:5000"
    const { showalert } = props;
    let navigate = useNavigate();
    const [detail, setdetail] = useState({ email: "", password: "" })

    const onchange = (e) => {
        setdetail({ ...detail, [e.target.name]: e.target.value })
    }

    const handleclick = async (e) => {
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ email: detail.email, password: detail.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            localStorage.setItem('username', json.Name);
            showalert(json.msg, "success")
            navigate('/')
        } else {
            showalert(json.msg, "danger")

        }
    }

    return (
        <div className='container my-3'>
            <form onSubmit={handleclick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={setdetail.email} onChange={onchange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={setdetail.password} onChange={onchange} id="password" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
