
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


function useUsers() {
    const [ users, setUsers ] = useState([]);

    console.log("this.state.user.email",)

    useEffect(() => {
        fire
        .firestore()
        .collection("users")  
        .where("email", "==" ,"aaa@aaa.com").get().then((snapshot) => { 
            const newUsers = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setUsers(newUsers)
        })
    }, [])
   
    return users
}

const styles = theme => ({ 
    fab: {
        position: 'fixed',
        bottom: 20,
        right: 20,
    },
})

const UserInfo  = () => { 

        const users = useUsers()
    
        return (
            <div>
                <h2>display userinfo</h2>
    
                {users.map((user) =>
                <Card>
                    <CardContent>
                        {user.email} {user.name} {user.point}
                    </CardContent>
                    </Card>   
    
    )}
            </div>
    
        )
    }

   export default withStyles(styles)(UserInfo);


