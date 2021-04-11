import React from 'react';
import PropTypes from 'prop-types';
import CakeIcon from '@material-ui/icons/Cake';
import female from 'assets/images/female.png';
import male from 'assets/images/male.png';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import 'Components/UserDetails/index.css';

const UserDetails = ({ user, currentUser }) => {
  const {
    first_name, last_name, email, dob, gender,
  } = user;

  return (
    <div>
      <div className='user-section'>
        { gender === 'male' ? (<img src={male} alt='male' />)
          : (<img src={female} alt='female' />)}
        <div className='details'>
          <div className='user_container1'>
            <h1>
              {' '}
              {first_name}
              {' '}
              {last_name}
            </h1>
          </div>
          <div className='user_container2'>
            <div className='arrange1'>
              <MailIcon />
              {email}
            </div>
            <div className='arrange2'>
              <CakeIcon />
              {dob}
            </div>
          </div>
          {
            currentUser && (
              <>
                <div className='edit-details'>
                  <Link to='/edit-details'>

                    Edit Profile
                  </Link>
                </div>
                <Link to='/home/profile/bookmark'>
                  <div className='my_bookmarks'>
                    My Bookmarks
                  </div>
                </Link>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};
UserDetails.propTypes = {
  user: PropTypes.shape({
    gender: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    dob: PropTypes.string,
  }),
  currentUser: PropTypes.bool,
};

UserDetails.defaultProps = {
  user: {},
  currentUser: false,
};

export default UserDetails;
