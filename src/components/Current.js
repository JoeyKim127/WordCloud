import React from 'react';


const Current = (props) => {
  const { name } = props.current;
  const { lon, lat } = props.current.coord;
  const { country } = props.current.sys;
  
  console.log("Current: props.current.name", props.current.name);
  
  return (
    <>
  <h2>{lon}</h2>
  <h2>{lat}</h2>
<h2 className="text-muted padding-left">{country},{name}</h2>
    </>
  );
};

export default Current;




