import React from 'react';
import Loader from '../assets/images/icons/Loader/Background.svg';
import '../assets/css/loading.css';

const Loading = () => {
  return (
    // <div className='loading-bg'>
    //     <div className="loading" data-loading-text="Abdullah"></div>
    // </div>
    <div className="loader">
      <img src={Loader} alt="Loader" className="loading" />
    </div>
  );
};

export default Loading;
