import React, { Component } from 'react'
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


const databaseURL = "https://wordcloud-a7c93.firebaseio.com/";


const styles = theme => ({ 
    fab: {
        position: 'fixed',
        bottom: 20,
        right: 20,
    },
})


class Words extends Component {
    constructor() { 
        super(); 
        this.state = {
            advertisment: {},
            dialog: false,
            title: '',
            company: '',
        };
    }

    // 데이터 가져오기
    _get() {
        fetch (`${databaseURL}/advertisement.json`).then(res => {
            // 200번이 아니면 firebase에 오류가 발생한거니까 오류 보여주기
            if(res.status != 200) {
                throw new Error(res.statusText);
            } 
            // 200번이면 결과가 json으로 출력해서보여주기
            return res.json();
            // 그리고 그 json 결과를 words라는 변수에 담아서 
            // wordstate값에 데이터베이스에서 출력이 된 단어 정보를 넣도록 한다
        }).then(advertisment => this.setState({advertisment:advertisment}));
    }


    componentDidMount() {
        console.log("componentdidmount", this)
        this._get();
    }


handleDialogToggle = () => this.setState({
    // 스위치 함수: dialog 상태를  true에서 false로 전환, false에서 true로 전환
    dialog: !this.state.dialog
})

//사용자가 화면에서 새로운 데이터를 입력하면 react에서는 샃태변화를 통해
// 사용자가 입력하는 정보는 화면에서 보여주기 위해서는 valuechange라는 함수가 꼭 필요하다
handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
}



// 삭제 버튼 눌렀을 때 delete 함수 수행되도록 설정
handleDelete = (id) => {
    this._delete(id);
}

// sendToHome = (weight) => {
 
// }
    

    render() {
        const { classes } = this.props; 
    //    console.log("this.state.words",this.state.words)
    //    console.log("this.state.words.weight",this.state.words.weight)

    //    console.log("this.state.word",this.state.word)

   
    return (
        <div>
            {Object.keys(this.state.advertisment).map(id => {
                const ad = this.state.advertisment[id];
                return (
                    <div key={id}>
                    <Card>
                        <CardContent>
                            <Grid container>
                            <Grid item xs={2}>
                            <Typography>img</Typography>
                                </Grid>

                                <Grid item xs={8}>
                            <Typography>title</Typography>
                            
                            <Typography color="textSecondary" gutterBottom>
                                가중치: {ad.company}
                            </Typography>
                                <Typography variant="h5" component="h2">
                                Word: {ad.title}
                            </Typography>
                        </Grid>
                            
                                <Grid item xs={1}>
                                    <Button variant="contained" color="primary" onClick={() => this.handleDelete(id)}>
                                        삭제
                                    </Button>
                                   <AdPopup />
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                   </div> 
                );
            })}

            {/* 밑에서 고정되어 둥둥 떠다니는 버큰 */}
            <Fab color="primary" className={classes.fab} onClick={this.handleDialogToggle}>
                <AddIcon />
            </Fab>
            <Dialog open={this.state.dialog} onClose={this.handleDialogToggle}>
                <DialogTitle>watch</DialogTitle>
                <DialogContent>
                    <TextField label="단어" type="text" name="title" value={this.state.title} onChange={this.handleValueChange} />
                    <br />
                    <TextField label="가중치" type="text" name="company" value={this.state.company} onChange={this.handleValueChange} />
                    <br />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                        추가
                     </Button>
                    <Button variant="outlined" color="primary" onClick={this.handleDialogToggle}>
                        닫기
                    </Button>
                </DialogActions>
            </Dialog> 

           </div>
           
           
        );
    }
}
export default withStyles(styles)(Words);