import React from 'react'

const Imageitem = (props) => {
    const click = ()=>{
      console.log(props._id);
    }
   
  return (
    <div className='d-flex'>
        <img onClick={click} src={props.path} className="card-img-top" alt="Not found"/>
    </div>
  )
}

export default Imageitem
