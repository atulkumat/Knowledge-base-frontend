import React from 'react';
import Loader from 'react-loader-spinner';
import { blue } from 'constants/color';
import 'Components/PageLoader/index.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function PageLoader() {
  return (
    <div data-testid='loader' className='loader'>
      <Loader
        type='BallTriangle'
        color={blue}
        height={300}
        width={300}
      />
    </div>
  );
}

export default PageLoader;
