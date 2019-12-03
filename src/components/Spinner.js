import React from 'react';
import { Spinner as Loader} from 'react-bootstrap';
// import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner">
      <Loader animation="border" />
    </div>
  );
};

export default Spinner;



// import React from 'react';

// const Spinner = () => {
//   return (
//     <div>
//       로딩중...
//     </div>
//   );
// };

// export default Spinner;