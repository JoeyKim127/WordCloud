import React from 'react'
import ReactDOM from 'react-dom'
// import { Transition } from 'react-spring'
import CardContent from '@material-ui/core/CardContent';

class App extends React.Component {
  state = {
    clicked: [],
    items: [
      { key: 1, text: "hello 1" },
      { key: 2, text: "hello 2" },
      { key: 3, text: "hello 3" },
      { key: 4, text: "hello 4" }
    ]
  }
  clickHandler(item) {
    return (e) => {
      this.setState({
        clicked: this.state.clicked.concat([item]),
        items: this.state.items.filter((x) => x.key != item.key)
      })
      console.log(item);
    }
  }
  constructor() {
    super()
    console.log('constructor')
    this.clickHandler = this.clickHandler.bind(this)
  }
  render() {
    let items = this.state.items

    return (
      <div>
      <div class='container'>
          <CardContent>
        {/* <Transition */}
          keys={items.map(item => item.key)}
          from={{ opacity: 0, width: 0 }}
          enter={{ opacity: 1, width: 100 }}
          leave={{ opacity: 0, width: 0 }}>
          {items.map(item => styles =>
            <a href='#x' onClick={this.clickHandler(item)} style={styles}><span>{item.text}</span></a>)}
        {/* </Transition> */}
        </CardContent>
      </div>
      <ul>
        {this.state.clicked.map((item, i) => <li key={i}>{item.text}</li>)}
      </ul>
      </div>
    )
  }
}

/*

*/
// ReactDOM.render(<App />, document.getElementById('root'))
export default AdList;