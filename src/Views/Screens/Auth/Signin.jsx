//Reference -> https://mui.com/material-ui/getting-started/templates/
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../../Components/Images/logo_transparent.png';
import { useNavigate } from 'react-router-dom';

import './Styles/Signin.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../../../Controllers/Redux/authSlice';
import { signIn } from '../../../Controllers/Requests/dbRequests';

const Signin = () => {
  //AXIOS POST, REDUX UPDATE STATE, JWT TOKEN, FORM VALIDATION E.T.C.
  //*THERE IS A BUG HERE WITH FORM VALIDATION
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //Idea here is to get DB data's email, password accountType and see if they match with the forms email, password & jwt -> hash password instead for aws secrets manager

    signIn({ email: email, password: password }).then((res) => {
      //authenticate user using JWT, update user slice, and navigate to first screen

      if (res.status === 200) {
        alert('success');
        console.log(res.data.user.accountType, ' res data');
        dispatch(signin(res.data));
        res.data.user.accountType === 'renter'
          ? navigate('/listings')
          : navigate('/mylistings');
      } else {
        alert('err');
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={Logo} className="LogoStyle" alt="logo"></img>
        <Typography
          component="h1"
          variant="h5"
          style={{ color: 'black', fontWeight: 700 }}
        >
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmailChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/Signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;
