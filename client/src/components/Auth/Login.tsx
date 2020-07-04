import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React from 'react';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  form: {
  },
  input: {
    marginBottom: '1rem'
  },
  button: {
    margin: '1rem auto'
  }
}))

const Login = () => {

  const classes = useStyles();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let email: string = e.target.elements.email.value;
    let password: string = e.target.elements.password.value;

    axios.post('/auth/login', {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit}>
      <TextField
        className={classes.input}
        name="email"
        autoFocus
        fullWidth
        required
        label="Email"
        type="email"
        // value while testing
        value="test@test.com"
        placeholder="Email"
      ></TextField>
      <TextField
        className={classes.input}
        name="password"
        fullWidth
        required
        label="Password"
        // value while testing
        value="1234567"
        type="password"
        placeholder="Password"
      ></TextField>
      <Button
        className={classes.button}
        type="submit"
        fullWidth
        variant="outlined"
        color="primary"
      >Login</Button>
    </form>
  )
}

export default Login;