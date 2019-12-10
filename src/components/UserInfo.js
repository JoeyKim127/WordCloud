
import React, { useState,useEffect } from 'react'
import fire from '../config/Fire'
import 'firebase/firestore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import  {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({ 
    fab: {
        position: 'fixed',
        bottom: 20,
        right: 20,
    },
})

const UserInfo  = ({email,users,classes}) => { 

    console.log()
        return (
            <div>
                <div>
                <h2>display userinfo</h2>
                </div>
                {users.map((user)=> 
                <div key={user.id}>
                 <Card>
                    <CardContent>
                        {user.email} 
                        {user.name} 
                        {user.point}
                    </CardContent>
                </Card>   
                
                </div>
                )}
                </div>
        )
    }

   export default withStyles(styles)(UserInfo);


