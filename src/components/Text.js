import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import fire from '../config/Fire'

class Text extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

 // logout function
 logout() {
    fire.auth().signOut();
  }
  
  
    render() {
    return (
        <div>
           <Card>
               <CardContent>
               <Button onClick={this.logout} variant="contained" color="primary" >
                                        logout
                                    </Button>
               </CardContent>
        </Card> 
        </div>
    )
}
}
export default Text;