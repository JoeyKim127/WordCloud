import React from 'react';


const Current = (props) => {
  const { name} = props.current;
  const { lon, lat } = props.current.coord;
  console.log("props", props)
  console.log("props.current", props.current);
  console.log("props.current.coord", props.current.coord);

  
  return (
    <>
  <h2>{lon}</h2>
  <h2>{lat}</h2>
  <h2 className="text-muted padding-left">{name}</h2>
    </>
  );
};

export default Current;




