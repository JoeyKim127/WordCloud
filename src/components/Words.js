import React, { useState,useEffect } from 'react'
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


function useTimes() {
    const [ times, setTimes ] = useState([])


    useEffect(() => {
        fire
        .firestore()
        .collection("advertisement")
        .onSnapshot((snapshot) =>  {
            console.log("snapshot.docs",snapshot.docs)
            console.log("snapshot.docs[2].id",snapshot.docs[2].id)
            console.log("snapshot.docs[2].data()",snapshot.docs[2].data())

            const newTimes = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            setTimes(newTimes)
        })
    }, [])

    return times
}

const styles = theme => ({ 
    fab: {
        position: 'fixed',
        bottom: 20,
        right: 20,
    },
})


const Words  = () => { 

    const times = useTimes()

    return (
        <div>
            
    
            <h2>AdList</h2>
            <div>
            <label>Sort By:</label>{''}
            <select>
                <option>location</option>
                <option disabled >-----</option>
                <option>A to Z</option>
            </select>
            </div>

                {times.map((time) =>
            <div key={time.id}>
                <Card>
                <CardContent>
                <Grid container>
                    <Grid item xs={2}> {time.img} </Grid>
                    <Grid item xs={8}>
                        <Typography>{time.title}</Typography>
                        <Typography color="textSecondary">{time.company}</Typography>
                        <Typography gutterBottom>{time.location}</Typography>
                    </Grid>
                    <Grid item xs={1}><AdPopup /></Grid>
                </Grid> 
                </CardContent>
                </Card>     
                </div>  
               
                    )}
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

export default withStyles(styles)(Words);