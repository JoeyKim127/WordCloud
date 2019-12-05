import React, { Component } from 'react'
import fire from '../config/Fire'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import  {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { DialogContent } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import AdPopup from './AdPopup';

// fire.filestore().collections("advertisement").add({
//     title: 'bottle',
//     img: '',
//     location: 'seoul',
//     company: 'company',
// })


// const db = fire.firestore();
//             db.settings({
//                 timestampsInSnapshots: true
//             });
//             const ad = db.collection("advertisement").add({
//                 title: 'bottle',
//                 img: '',
//                 location: 'seoul',
//                 company: 'company',
//             });  
//             console.log("dbuser",ad);
        
const NewAdlist  = () => {


    return (
        <div>
            <h2>new AdList</h2>
            <div>
            <label>Sort By:</label>{''}
            <select>
                <option>location</option>
                <option disabled >-----</option>
                <option>A to Z</option>
            </select>
            </div>
            <ol>
                <li>
                <div className="title">
                    phone
                    <code className="time">18 seconds</code>
                </div>
                </li>

                <li>
                <div className="title">
                    phone
                    <code className="time">18 seconds</code>
                </div>
                </li>

                <li>
                <div className="title">
                    phone
                    <code className="time">18 seconds</code>
                </div>
                </li>
            </ol>
<br />
           <form>
               <h2>ADD Addition</h2>
               <div>
                   <label>title</label>
                   <input type="text"></input>
               </div>

               <div>
                   <label>time</label>
                   <input type="numbers"></input>
               </div>
               <button>ADD</button>
           </form>


        </div>

    )
}


export default NewAdlist;
    
