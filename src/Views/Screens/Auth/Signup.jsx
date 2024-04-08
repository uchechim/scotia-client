//Reference -> https://mui.com/material-ui/getting-started/templates/

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../../Components/Images/logo_transparent.png';
import validator from 'validator';
import { RadioGroup, Radio, FormControlLabel, FormLabel } from '@mui/material';
import { useState } from 'react';
import { signUp } from '../../../Controllers/Requests/dbRequests';

const Signup = () => {
  const [accountType, setAccountType] = useState('Renter');
  const navigate = useNavigate();
  const handleChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    //preliminary error checking of form input
    for (let [key, val] of data) {
      if (!val) {
        alert('Please fill in all required fields');
        return;
      }
      if (key === 'email') {
        if (!validator.isEmail(val)) {
          alert('incorrect email');
          return;
        }
      }
    }

    //AXIOS POST create new user
    const user = {
      email: data.get('email'),
      password: data.get('password'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      accountType: accountType,
    };

    signUp(user);
    navigate('/signin');
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
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between">
            <Grid style={{ marginTop: 10 }} item>
              <FormLabel
                id="demo-controlled-radio-buttons-group"
                style={{ color: 'black' }}
              >
                Account Type
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={accountType}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="renter"
                  control={<Radio />}
                  label="Renter"
                />
                <FormControlLabel
                  value="landlord"
                  control={<Radio />}
                  label="Landlord"
                />
              </RadioGroup>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/Signin">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
