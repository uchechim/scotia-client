import './Styles/Landing.css';
import Logo from '../../Components/Images/logo_transparent.png';
import Button from '@mui/material/Button';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="General">
      <Outlet />
      <div className="Header">
        <div className="Block">
          <h1>Scotia Rentals</h1>
        </div>
      </div>
      <div className="LandingBlock">
        <div className="ImgDiv">
          <img src={Logo} alt="logo-transparent" className="LogoStyle" />
        </div>

        <div className="Landing Info">
          <div className="Divider"></div>
          <div className="LandingTextContainer">
            <h1>FIND YOUR IDEAL HOUSING UNIT</h1>
            <h4>
              Providing Listings In The Truro, Halifax, and Dartmouth areas.
            </h4>
          </div>

          <div className="BtnContainer">
            <Button
              variant="contained"
              style={{ backgroundColor: '#0147B6' }}
              component={Link}
              to="/signin"
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: '#0147B6' }}
              component={Link}
              to="/signup"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
