import React, { useState, useEffect } from 'react';
import { ClipLoader, BarLoader, BeatLoader, BounceLoader, CircleLoader, ClimbingBoxLoader } from "react-spinners";
import './LoadingPage.css';


const LoadingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) {
    return (
      <div className='loading-container'>
        {/* <ClipLoader/> */}
        <BounceLoader  size = {200}color='white'/>
        {/* <CircleLoader/>
        <ClimbingBoxLoader/> */}
        <h2>Do you really know me 🤭...</h2>
      </div>
    );
  }
  return (
    <div>
      <p>Loaded!</p>
    </div>
  );
};

export default LoadingPage;
