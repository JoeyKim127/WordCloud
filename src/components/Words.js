import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const databaseURL = "https://wordcloud-a7c93.firebaseio.com/";

class Words extends Component {
    constructor() { 
        super();
        this.state = {
            words: {}
        }
    }
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
    shouldComponentUpdate(nextProps,nextState) {
        return nextState.words != this.state.words;
    }
    componentDidMount() {
        console.log(this)
        this._get();
    }
    
    render() {
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
                            <Typography variant="h5" component="h2">
                                Word: {word.word}
                            </Typography>
                        </CardContent>
                    </Card>
                   </div> 
                );
            })}
           </div>
           
           
    );
}
}
export default Words;