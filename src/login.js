import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useHistory} from'react-router-dom';
import localStorage from 'local-storage'
import Alert from '@mui/material/Alert';
import { onMessageListener } from "./firebase";
import Notifications from "./components/Notifications/Notification";
import ReactNotificationComponent from "./components/Notifications/ReactNotification";

const theme = createTheme();

function Login(props) {

    //history.go(-1);
    //history.push("/");
    localStorage.clear();

    const [email, setemail]=useState("");
    const [password, setpassword]=useState("");
    const [error, seterror]=useState(null);
    let history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(email)
        //console.log(password)
        //axios.post('http://127.0.0.1:8000/api/login', {
        axios.post(process.env.REACT_APP_API_URL+'/login', {
          "email": email,
          "password": password,
          })
        .then(function (response) {
            console.log(response.data)
            axios.defaults.headers["Authorization"] = "bearer"+response.data.token
            localStorage.set('auth', JSON.stringify(response.data));
            if (props.token!==null){
            Set_Token(response.data.id)
            }
            if (response.data.user_type===2){
            history.push("/main/parent");
            }
            if (response.data.user_type===3){
              history.push("/main/babysitter");
              }
            })
            .catch(function (error) {
             
              seterror(true);
        
            });
          }
          

          function Set_Token(id){
            //axios.post('http://127.0.0.1:8000/api/save-device-token', {
            axios.post(process.env.REACT_APP_API_URL+'/save-device-token', {
                  "token": props.token,
                  "user_ID": id,
                  })
                .then(function (response) {
                  console.log(response);
                    }
                    )
                    .catch(function (error) {
                     
                      console.log(error);
                
                    });
          }

  return (
   <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(babysitter.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
               <img src="../../logo.png" alt="logo" style={{width:'50%'}} />
            
            <Typography component="h1" variant="h5" >
              Welcome Back
            </Typography>
            <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                type="email"
                autoFocus
                value={email}
                onChange={(e)=>setemail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(e)=>setpassword(e.target.value)}
              />
            
              <Button
                type="submit"
                fullWidth
                style={{backgroundColor: '#2E3B55', color: '#FFFFFF'}}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item>
                  <Link to="/register" variant="body2" >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                
              </Grid>
            </Box>
          </Box>
          {error? <Alert severity="error">Incorrect Credentials</Alert> : null}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;