import React, { useState,useEffect } from 'react'

import fire from '../config/Fire'
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
// import FileUpload from './Fileupload'


const AddToList = () => {

    const [ company, setCompany ] = useState('');
    const [ title,setTitle ] = useState('');
    const [ img, setImg ] = useState('');
    const [ location, setLocation ] = useState('');


    const [image, setImage] = useState('');
  const [imageURL, setImageUrl] = useState('');
  const [progress, setProgress] = useState(0);

function onSubmit(e) {
    e.preventDefault()
    fire.firestore().collection("advertisement")
    .add({
        title,
        company,
        // imageUrl,
        img,
        location,
    })
    .then(() => {
        setTitle('')
        setCompany('')
        // setImageUrl('')
        setImg('')
        setLocation('')
    })
}


const handleUploadStart = () => {
    setProgress(0);
  };

  const handleUploadSuccess = filename => {
    setImage(filename);
    setProgress(100);

    fire
      .storage()
      .ref('avatars')
      .child(filename)
      .getDownloadURL()
      .then(url => setImageUrl(url));
  };

  console.log("Add to List: imageURL",imageURL)

return (
        <form onSubmit={onSubmit}>
               <h2>Add To List</h2>
               <div>
                   <label>title</label>
                   <input type="text" value={title} onChange={e => setTitle(e.currentTarget.value)}></input>
               </div>

               <div>
                   <label>company</label>
                   <input type="text" value={company} onChange={e => setCompany(e.currentTarget.value)}></input>
               </div>

               <div>
                   <label>location</label>
                   <input type="text" value={location} onChange={e => setLocation(e.currentTarget.value)}></input>
               </div>

               <FileUploader
                accept="image/*"
                name="image"
                storageRef={fire.storage().ref('avatars')}
                onUploadStart={handleUploadStart}
                onUploadSuccess={handleUploadSuccess}
                // value={imageURL}  
                // onChange={e => setImageUrl(e.currentTarget.value) }
                 />
      <div>
        <img src={imageURL} />
      </div>

               <div>
                   <label>img</label>
                   <input type="text" value={imageURL}  onChange={e => setImg(e.currentTarget.value) } />
               </div>
               <button>ADD</button>
           </form>
    )
}

export default AddToList;