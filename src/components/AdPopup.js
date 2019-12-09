import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


const styles = theme => ({
   title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdPopup = (props) => {

  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const { classes } = props;

  return (
    <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}> Add popup </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        
        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>


        <Typography variant="h6" className={classes.title}>
        {/* <img height="100px" width="100px" src ={time.img} /> */}
        </Typography>


        <Button autoFocus color="inherit" onClick={handleClose}>
          point 7
        </Button>
  </Dialog>
  </div>
  );
}

export default withStyles(styles)(AdPopup);