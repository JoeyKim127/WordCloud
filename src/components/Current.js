import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

  whole: {
    textAlign: 'center',
    backgrounColor: '#574000',
    marginTop: '-20px',
    // marginBottom: '50px'

  } ,
  location: {
    fontSize: 20
  },
  latlon: {
    fontSize: 15,
    marginTop: '-10px',
    // marginBottom: '50px'

  },

})

const Current = (props) => {
  const { name } = props.current;
  const { lon, lat } = props.current.coord;
  const { country } = props.current.sys;
  
  const {classes} = props;
  console.log("Current: props.current.name", props.current.name);
  
  return (
    <>
<div className={classes.whole}>
<h2 className={classes.location} >{country},{name}</h2>
<h2 className={classes.latlon}> {lon} &nbsp; {lat}</h2>
</div>

    </>
  );
};

export default withStyles(styles)(Current);




