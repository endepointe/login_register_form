import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import AuthForm from './components/Auth/AuthForm';

const useStyles = makeStyles(() => ({
  app: {
    width: '100%',
    height: '100%',
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <Container className={classes.app}>
      <CssBaseline />
      <AuthForm />
    </Container>
  );
}

export default App;
