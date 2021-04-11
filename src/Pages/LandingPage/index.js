import React from 'react';
import Header from 'Components/Header';
import { useHistory } from 'react-router-dom';
import 'Pages/LandingPage/index.css';

const LandingPage = () => {
  const history = useHistory();
  return (
    <div className='landingpage'>
      <Header />
      <div className='landing__main'>
        <div className='landing__mainContent'>
          <p className='main__heading'>Knowledge Base</p>
          <p className='main__text'>Put knowledge where people trip over it.</p>
          <input
            type='button'
            onClick={() => history.push('/home')}
            value='Get Started'
            className='landing-btn'
          />
        </div>
      </div>
      <h2 className='landing__heading'>For developers, by developers</h2>
    </div>
  );
};

export default LandingPage;
