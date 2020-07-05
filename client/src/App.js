import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import React,
{
  createContext,
  useContext,
} from 'react';
import AuthForm from './components/Auth/AuthForm';

const AdminContext = createContext({
  admin: '',
  authenticated: false,
});

const useStyles = makeStyles(() => ({
  app: {
    width: '100%',
    height: '100%',
  }
}));

const App = () => {
  const classes = useStyles();
  const adminContext = useContext(AdminContext);
  console.log(adminContext);
  return (
    <Container className={classes.app}>
      <CssBaseline />
      <AuthForm />
    </Container>
  );
}

export default App;
