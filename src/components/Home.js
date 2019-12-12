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

import './Home.css';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: 20,
    right: 20,
  },
  header: {
    backgroundColor: '#badebc',
  },
  points: {
    
  },
})


const Home = (props,) => {
  const APPID = keys.APPID;
  const [current, setCurrent] = useState(null);
  const [ name, setName ] = useState('');
  const [ times, setTimes ] = useState([]);
  const [ userlists, setUserlists ] = useState([]);
  const [ point,setPoint ] = useState('');

  // console.log("Home: props",props)
  // console.log("Home: current", current)
  // console.log("Home: props.loggedInUser", props.loggedInUser)
  // console.log("Home: props.loggedInUser.email", props.loggedInUser.email)
  // console.log("Home: email", email)

  // const { classes } = props;
 
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

const showUserInfo = async () => {
  await fire
  .firestore()
        .collection("users")  
        .where("email", "==", "eee@eee.com").get().then((snapshot) => { 
            const newUserlists = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setUserlists(newUserlists)
  })
}

const getUser = () => {
  const email = props.loggedInUser.email
  showUserInfo(email);
  // console.log("email",email)
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
    // console.log("coords", coords)
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
    getUser();
    // getPoint();
  }, []);


  return (
      <React.Fragment>
        <CssBaseline />
        <Paper >
        <div className="header">
                <h2>display userinfo in home</h2>
                </div>
                {userlists.map((userlist)=> 
                <div key={userlist.id}>
                  {userlist.email}
                       <p>{userlist.name}님, 어서오세요!</p> 
                         
                         <div className="points">
                        {userlist.point}
                        
                        </div>
                </div>
                )}
          {/* <UserInfo userlists={userlists} /> */}
        <main >{!current ? <Spinner /> :
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

