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
        if (res.data.status === 1) {
          // success
          console.log(res.data.msg);
          // render admin page
        }
        if (res.data.status === 0) {
          console.log(res.data.msg);
        }
        if (res.data.status === 2) {
          console.log(res.data.msg);
        }
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
        // value="test@tst.com"
        // value="does@not.exist"
        // value="test@test.com"
        value="endepointe@gmail.com"
        // value="ende@ende.com"
        // value="ende@test.com"
        placeholder="Email"
      ></TextField>
      <TextField
        className={classes.input}
        name="password"
        fullWidth
        required
        label="Password"
        // value while testing
        value="1bs2b3bd1"
        // value="invalidpassword"
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