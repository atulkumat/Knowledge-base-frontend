import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from 'assets/images/logo.png';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { logOut } from 'actions/authActions';
import { LOGIN } from 'constants/routePath';
import { useSelector, useDispatch } from 'react-redux';
import 'Components/Header/index.css';

const Header = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleAuthentication = () => {
    if (user) {
      dispatch(logOut(history));
    } else {
      history.push(LOGIN);
    }
  };
  return (
    <div className='header'>
      <Link to='/'>
        <img src={logo} alt='logo' className='header__logo' />
      </Link>
      <div className='header__nav'>
        <div className='header__option'>
          <Link to={user ? '/home/profile' : '/login'}>
            <div className='header__profile'>
              <AccountCircleIcon />
              <span className='header__optionOne'>
                {
                  user ? user.first_name : 'Hello Guest'
                }
              </span>
            </div>
          </Link>
        </div>
        <div className='header__options'>
          <div className='authentication'>
            <span
              className='header__optionTwo'
              onClick={handleAuthentication}
            >
              {
                user ? 'Sign Out' : 'Sign In'
              }
            </span>
            {
              !user
              && (
              <Link to='signup'>
                <span className='header__optionTwo'>
                  Sign Up
                </span>
              </Link>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
