import React, { useState,useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import fire from '../config/Fire'
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
// import FileUpload from './Fileupload'


const styles = theme => ({ 
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: 200,
        },
      },
    });



const AddToList = (props) => {

    const {classes} = props
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
        <form className={classes.root} onSubmit={onSubmit} >
               <h2>광고 추가하기</h2>
               <div>

                    <TextField 
                        type="text" 
                        id="standard-basic" 
                        label="Title" 
                        value={title} 
                        onChange={e => setTitle(e.currentTarget.value)}/>
                   {/* <input   ></input> */}
               </div>

               <div>
               <TextField 
                    type="text" 
                    id="standard-basic" 
                    label="Company" 
                    value={company} 
                    onChange={e => setCompany(e.currentTarget.value)}/>
               </div>

               <div>
               <TextField 
                    type="text" 
                    id="standard-basic" 
                    label="Location" 
                    value={location} 
                    onChange={e => setLocation(e.currentTarget.value)}/>
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
                        <p>미리보기</p>
                        <img src={imageURL} />
                    </div>

               <div>
               <TextField 
                    type="text" 
                    id="standard-basic" 
                    label="imgURL" 
                    value={imageURL} 
                    onChange={e => setImg(e.currentTarget.value)}/>
                </div>
               <Button variant="outlined" color="secondary">ADD</Button>
           </form>
    )
}

export default withStyles(styles)(AddToList);