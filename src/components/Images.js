import React from 'react'
import { useContext, useState, useEffect } from 'react'
import ImgContext from '../context/images/ImageContext'
import { useNavigate } from 'react-router-dom';
import Imageitem from './Imageitem';

function Images(props) {
  const {showalert} = props


  const context = useContext(ImgContext);
  const { uploadimage,images,getImages } = context;

  const [imgname, setimgname] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')!==null) {
      getImages()
      // eslint-disable-next-line
    }else{
      navigate('/login')
    }
      
  },)

  const submit = (e) => {
    e.preventDefault()
    if(!imgname.length < 1){
      uploadimage(imgname)
      showalert("Successfully Uploaded","success")
    }else{
      showalert("Please select an image","danger")
    }
  }
  const convertToBase64 = (e) => {
    var reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      // console.log(reader.result);
      setimgname(reader.result)
    };
    reader.onerror = error => {
      console.log(error);
    }
  }

  return (
    <>
      <div className='container my-2 '>
        <form onSubmit={submit}>
          <input type='file' accept='image/*' className="img-thumbnail" onChange={convertToBase64} />
          <button className='btn btn-primary mx-2'>Upload</button>
          <div style={{display:'grid',gridTemplateColumns:'auto auto auto auto auto auto auto auto auto'}}>
            {images.map((image)=>{return <Imageitem path = {image.Image}  key = {image._id}></Imageitem>})}
          </div>
        </form>
      </div>
    </>
  )
}

export default Images
