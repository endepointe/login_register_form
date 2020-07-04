import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React,
{
  useState
} from 'react';
import Login from './Login';
import Register from './Register';

const useStyles = makeStyles(() => ({
  formPaper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '366px',
    height: 'auto',
    margin: 'auto',
    padding: '1.6rem 1rem 1rem 1rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  }
}));

const AuthForm = () => {

  const classes = useStyles();

  const [login, setLogin] = useState(true);

  const switchAuthType = (e: any) => {
    setLogin(!login);
    console.log(typeof e);

    if (e.target.textContent === 'Need an account? Register') {
      e.target.textContent = 'Have an account? Login';
    } else {
      e.target.textContent = 'Need an account? Register';
    }
  }

  return (
    <Paper
      className={classes.formPaper}
      elevation={6}
    >
      {login ? <Login /> : <Register />}
      <Typography align="center">
        <Link
          id='authTypeBtn'
          component="button"
          onClick={switchAuthType}>Need an account? Register</Link>
      </Typography>
    </Paper>
  )
}

export default AuthForm;