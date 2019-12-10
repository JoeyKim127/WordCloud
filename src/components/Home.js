import React, { Component, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CssBaseline } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Words from './Words';
import Axios from 'axios';
import Current from './Current';
import Spinner from './Spinner';
import keys from './Keys';
import AdPopup from './AdPopup'
import NewAdlist from './NewAdlist';
import UserInfo from './UserInfo'
import fire from '../config/Fire';

// import './App.css';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: 20,
    right: 20,
  },
  header: {
    backgroundColor: '#badebc',
  }
})


const Home = (props) => {
  console.log("Home: props",props)
  const APPID = keys.APPID;
  const [current, setCurrent] = useState(null);
  const [ name, setName ] = useState('');
  const [ times, setTimes ] = useState([]);
  const [ users, setUsers ] = useState([]);


  const email = props.loggedInUser.email
  // 데이터 여기서 받아오잖아 current 
  // const [ point,setPoint ] = useState(0);
  console.log("Home: current", current)
  // console.log("point",point)
  console.log("Home: props.loggedInUser", props.loggedInUser)
  console.log("Home: props.loggedInUser.email", props.loggedInUser.email)
  console.log("Home: email", email)

//  console.log("Home: email", email)

const adList = async (name) => { 
 await fire
  .firestore()
  .collection("advertisement")
  .where("location","==",name).get().then((snapshot) =>  { 
      const newTimes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setTimes(newTimes)
})
}

const userInfo = async (email) => {
  await fire
  .firestore()
        .collection("users")  
        .where("email", "=="  ,email).get().then((snapshot) => { 
            const newUsers = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setUsers(newUsers)
        })
}

 

  const getLocation = (props) => {
    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };


  const getTemp = async coords => {
    const { latitude: lat, longitude: lon } = coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APPID}&units=metric&lang=kr`;
    const result = await Axios.get(url);
    const { data } = result;
    setCurrent(data);
    setName(data.name);
    adList(data.name);
    userInfo(data.email);
    console.log("coords", coords)
  };

  const getAll = async () => {
    try {
      const { coords } = await getLocation();
      await getTemp(coords);

    } catch (error) {
      alert('위치 정보 동의가 있어야 서비스 이용이 가능합니다');
    };
  };

 useEffect(() => {
    getAll();
  }, []);


// const getPoint = () => {
//   // 데이터베이스안에 들어가서 값 가져오기
//   // 그리고 값을 setPoint를 설정해서 
//   const totalpoint = this.words.weight
// }


  return (
      <React.Fragment>
        <CssBaseline />
        <Paper>

          <UserInfo users={users} />
         
          HOME: React 앱 어플리케이션
         
        <main className="container">{!current ? <Spinner /> :
            <>
              <Current current={current}  /> </>}
          </main>
        </Paper>
        <Paper>
          <Typography> list area</Typography>
          <CardContent>
            <Words name={name} times={times}/>
          </CardContent>
        </Paper>


        <Paper>
          <Typography>완료</Typography>
        </Paper>

      </React.Fragment>
    
  );
};

export default withStyles(styles)(Home);

