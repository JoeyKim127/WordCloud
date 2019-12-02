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

const styles = theme => ({ 
    fab: {
        position: 'fixed',
        bottom: 20,
        right: 20,
    },
})

const databaseURL = "https://wordcloud-a7c93.firebaseio.com/";

class Words extends Component {
    constructor() { 
        super(); 
        this.state = {
            words: {},
            dialog: false,
            word: '',
            weight: '',
        };
    }

    // 데이터 가져오기
    _get() {
        fetch (`${databaseURL}/words.json`).then(res => {
            // 200번이 아니면 firebase에 오류가 발생한거니까 오류 보여주기
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            // 200번이면 결과가 json으로 출력해서보여주기
            return res.json();
            // 그리고 그 json 결과를 words라는 변수에 담아서 
            // wordstate값에 데이터베이스에서 출력이 된 단어 정보를 넣도록 한다
        }).then(words => this.setState({words:words}));
    }


    //  새로운 데이터 삽입
_post(word) {
    return fetch(`${databaseURL}/words.json`, {
        // post 방식은 데이터를 보내고  get방식은 데이터를 가져오는 것
        method: 'POST',
        body: JSON.stringify(word)
    }).then(res => {
        // 200 아니면 에러 표시 맞으면 json데이터 보여줘
        if (res.status != 200) {
            throw new Error(res.statusText);
        }
        return res.json();
    }).then(data => {
        //  새롭게 추가된 새로운 정보만 새로고침
        // 추가된 데이터를 받아오는 nextstate라는 변수 만들고
        let nextState = this.state.words;
        // 실제로 전송 요청을 한 데이터를 words state에 추가
        nextState[data.name] =  word;
        this.setState({words:nextState});
    });
}

// 데이터 삭제
// 특정 아이디값에 접근을해서 
_delete(id) {
    return fetch(`${databaseURL}/words/${id}.json`, {
        method: 'DELETE'
    }).then(res => {
            // 200 아니면 에러 표시 맞으면 json데이터 보여줘
            if (res.status != 200) {
                throw new Error(res.statusText);
            }
            // 성공적인 데이터 반환
            return res.json();
    }). then(() => {
        let nextState = this.state.words;
        delete nextState[id];
        this.setState({words: nextState});
    })
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

// 실제 데이터 삽입하기 위한 함수
handleSubmit = () => {
    // 사용자가 입력한 값을 word라는 변수안에 넣고
    const word = {
        word: this.state.word,
        weight: this.state.weight
    }
    this.handleDialogToggle();
    //  사용자가 word 또는 weight를 입력하지않은 경우
    if (!word.word && !word.weight ) {
        return;
        }
        // 둘다입력했으면 정상적으로 post 함수를 불러와서 firebase database에 등록할 수 잇도록
        this._post(word);
}


// 삭제 버튼 눌렀을 때 delete 함수 수행되도록 설정
handleDelete = (id) => {
    this._delete(id);
}
    
    render() {
        const { classes } = this.props; 
    return (
        <div>
            {Object.keys(this.state.words).map(id => {
                const word = this.state.words[id];
                return (
                    <div key={id}>
                    <Card>
                        <CardContent>
                            <Typography>title</Typography>
                            
                            <Typography color="textSecondary" gutterBottom>
                                가중치: {word.weight}
                            </Typography>

                            <Grid container>
                                <Grid item xs={6}>
                            <Typography variant="h5" component="h2">
                                Word: {word.word}
                            </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary" onClick={() => this.handleDelete(id)}>
                                        삭제
                                    </Button>
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
                <DialogTitle>단어추가</DialogTitle>
                <DialogContent>
                    <TextField label="단어" type="text" name="word" value={this.state.word} onChange={this.handleValueChange} />
                    <br />
                    <TextField label="가중치" type="text" name="weight" value={this.state.weight} onChange={this.handleValueChange} />
                    <br />
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                        추가
                    </Button>
                    <Button variant="outllined" color="primary" onClick={this.handleDialogToggle}>
                        닫기
                    </Button>
               </DialogActions>
            </Dialog>
           </div>
           
           
        );
    }
}
export default withStyles(styles)(Words);