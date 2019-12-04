import React, { Component, useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CssBaseline } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Words from './Words';
import Location from './Location';
import Axios from 'axios';
import Current from './Current';
import Spinner from './Spinner';
import keys from './Keys';
import AdPopup from './AdPopup'

// import './App.css';

const databaseURL = "https://wordcloud-a7c93.firebaseio.com/";


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
  const APPID = keys.APPID;
  const [current, setCurrent] = useState(null);
  // 데이터 여기서 받아오잖아 current 
  const [unit, setUnit] = useState('c');
  const [ point,setPoint ] = useState(0);

  console.log("currentApp", current)
  console.log("setCurrent", setCurrent)
  console.log("unit", unit)
  console.log("setUnit", setUnit)
  console.log("point",point)

 



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

const getPoint = () => {
  // 데이터베이스안에 들어가서 값 가져오기
  // 그리고 값을 setPoint를 설정해서 
}

  useEffect(() => {
    getAll();
  }, []);

  const { classes } = props;

  // const geo = (props) => {
  //   const { name } = props.current;
  //   const { lon, lat } = props.current.coord;
  //   console.log("props", props)
  //   console.log("props.current", props.current);
  //   console.log("props.current.coord", props.current.coord);
  // }

  return (
      <React.Fragment>
        <CssBaseline />
        <Paper className={classes.header}>
          HOME: React 앱 어플리케이션
          Header area
          total points 
        <main className="container">{!current ? <Spinner /> :
            <>
              <Current current={current} unit={unit} setUnit={setUnit} /> </>}
          </main>
        </Paper>
        <Paper>
          <Typography> list area</Typography>
          <CardContent>
            <Words />
          </CardContent>
        </Paper>


        <Paper>
          <Typography>완료</Typography>
        </Paper>

      </React.Fragment>
    
  );
};

export default withStyles(styles)(Home);

