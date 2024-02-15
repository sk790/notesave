import ImgContext from './ImageContext';
import {React,useState} from 'react';

const ImageState = (props) => {
  const host = "http://localhost:5000"

  const initialimage = [];

  const [images, setimages] = useState(initialimage)

  //Upload Image
  const uploadimage = async (Image) => {
    const response = await fetch(`${host}/api/image/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ Image })
    });
    const json = await response.json();
    console.log(json.msg);
  }

  //Get all imgages
  const getImages = async () => {
    const response = await fetch(`${host}/api/image/get-all-images`, {
        method: 'GET',
        headers: {
            'auth-token': localStorage.getItem('token')
        }
    });
    const json = await response.json();
    setimages(json)
    // console.log(json);
}


  return (
    <ImgContext.Provider value={{ uploadimage,images,setimages,getImages }}>
      {props.children}
    </ImgContext.Provider>
  )
}

export default ImageState;
