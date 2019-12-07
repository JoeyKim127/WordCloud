import React, { useState,useEffect } from 'react'

import fire from '../config/Fire'
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import FileUpload from './Fileupload'


const AddToList = () => {

    const [ company, setCompany ] = useState('');
    const [ title,setTitle ] = useState('');
    const [ img, setImg ] = useState('');
    const [ location, setLocation ] = useState('');


function onSubmit(e) {
    e.preventDefault()
    fire
    .firestore()
    .collection("advertisement")
    .add({
        title,
        company,
        img,
        location,
    })
    .then(() => {
        setTitle('')
        setCompany('')
        setImg('')
        setLocation('')
    })
}

function onSelectImgtoStorage(e){


// add to database
// e => setImg(e.currentTarget.value) 
} 



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

     <FileUpload />
               <div>
                   <label>img</label>
                   <input type="file" value={img} onChange={e => setImg(e.currentTarget.value) } />
               </div>
               <button>ADD</button>
           </form>
    )
}

export default AddToList;