import {React} from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Navbar = (props) => {
  
  const navigate = useNavigate()
  const handleclick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg d-flex navbar-dark sticky-top bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NoteSave</Link>
          <div className='container'>
          {!localStorage.getItem('username')?'':<Link className="navbar-brand " to="/">{localStorage.getItem('username')}</Link>}
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                {localStorage.getItem('token')?
                <Link className="nav-link active" to="/images">Images</Link>:null
                }
              </li>
            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
            </form> : <button onClick={handleclick} className='btn btn-primary'>Logout</button>}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
