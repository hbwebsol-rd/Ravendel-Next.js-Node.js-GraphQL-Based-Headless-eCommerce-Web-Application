import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  Grid,
  Button,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { LoginAction } from '../../store/action';
import {Alert, Loading} from '../components';
import { useNavigate } from 'react-router-dom';
import { client_app_route_url } from '../../utils/helper';
import palette from '../../theme/palette';
import { hover } from '@testing-library/user-event/dist/hover';
const LoginTheme = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const login_loading = useSelector(state => state.login.token_loading)
  const navigate= useNavigate();
    const [values, setValues] = useState({
        email: "admin@ravendel.com",
        password: "12345678"
    });    

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const login = e =>{
        e.preventDefault();
        dispatch(LoginAction(values.email, values.password));
        navigate(`${client_app_route_url}dashboard`)
    }

    return(
        <div className={classes.root}>
            <Alert />
            {login_loading? <Loading /> : null}
            <Grid className={classes.grid} container>
                <Grid className={classes.content} item lg={4} md={4} xs={12} >
                    <form className={classes.form} onSubmit={login}>
                        <Typography  className={classes.title} variant="h3"  >
                            Sign in
                        </Typography>
                        <TextField
                            className={classes.textField}
                            fullWidth
                            label="Email address"
                            name="email"
                            type="text"
                            variant="outlined"
                            value={values.email}
                            onChange={handleChange("email")}
                           
                        />
                        <TextField
                            className={classes.textField}
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            value={values.password}
                            onChange={handleChange("password")}
                        />
                        <Button
                            className={classes.signInButton}
                            color="primary"
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Log in
                        </Button>
                    </form>
                </Grid>
            </Grid>
      </div>
    )
}


const useStyles = makeStyles(theme => ({

    root: {
      // backgroundColor: theme.palette.background.default,
      height: '100%',
      //  backgroundColor: '#F4F6F8'
    
    },
    grid: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F6F8'
    },
    form: {
        
         backgroundColor: '#fff',
       
        width: '450px',
      // height:'500px',
        backgroundColor: '#fff',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            width: '90%',
            margin: '50px auto'
        },
        
    },
    title: {
      marginBottom: theme.spacing(4),
      textAlign: 'center',
     
      "&&": {
        marginBottom: "10px"
      }
    },
    textField: {
      
      "&&": {
       width:'430px',
        margin:'10px',
        marginRight:'10px',
        marginTop: "20px"

      }
  
    },
    signInButton: {
     
      "&&": {
         width: "430px",
         margin:'10px',
         marginRight:'15px',
         marginTop: "20px",
         backgroundColor: palette.text.secondary
       },
       '&:hover': {
        background: palette.text.secondary,
     },
    },
   
}));

const theme = createTheme(palette);
console.log(theme)
export default function Login() {
    
    return (
      <ThemeProvider theme={theme}>
        < LoginTheme />
      </ThemeProvider>
    );
  }