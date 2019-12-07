import React, { useState } from 'react';
import fire from '../config/Fire';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';

function Fileupload() {
  const [image, setImage] = useState('');
  const [imageURL, setImageUrl] = useState('');
  const [progress, setProgress] = useState(0);

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

  console.log("imageURL",imageURL)
  
  return (
    <div className="App">
      <h2>file upload and load</h2>

      <FileUploader
        accept="image/*"
        name="image"
        storageRef={fire.storage().ref('avatars')}
        onUploadStart={handleUploadStart}
        onUploadSuccess={handleUploadSuccess}
      />
      <div>
        <h4>show image</h4>
        <img src={imageURL} />
      </div>
    </div>
  );
}

export default Fileupload;