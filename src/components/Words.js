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

import AddToList from './AddToList'
import AdPopup from './AdPopup';


const styles = theme => ({ 
    fab: {
        position: 'fixed',
        bottom: 20,
        right: 20,
    },
    imgsize: {
        height: 'auto',
        width: '100%',
}
})


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


const Words = ({name,times,classes}) => { 

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');

    const handleClickOpen = ({ img }) => {
    setOpen(true);
    setImage(img);
  };

const handleClose = () => {
    //   add points
    setOpen(false);
  };

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
                    <Grid item xs={2}> 
                        <img className={classes.imgsize} src={time.img} />
                    </Grid>
                    <Grid item xs={8}>
                <Typography>{time.title} </Typography>
                        <Typography color="textSecondary">{time.company}</Typography>
                        <Typography gutterBottom>{time.location}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        {/* <AdPopup /> */}
                        <Button variant="contained" color="primary" onClick={() => {handleClickOpen(time)}}> popup</Button>
                        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} >

                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>

                            <img className={classes.imgsize} src={`${image}`} />
                            <Button autoFocus color="inherit" onClick={handleClose}>
                                Add 7  point 
                            </Button>

                        </Dialog>
                    </Grid>
                </Grid> 
                </CardContent>
                </Card>   
                </div>  
                    )}
<br />
                   <AddToList />  
            </div>

    )
}

export default withStyles(styles)(Words);