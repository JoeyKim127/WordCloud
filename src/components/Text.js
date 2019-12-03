import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

class Text extends Component {
    render() {
    return (
        <div>
           <Card>
               <CardContent>
               <Button variant="contained" color="primary" >
                                        logout
                                    </Button>
               </CardContent>
        </Card> 
        </div>
    )
}
}
export default Text;