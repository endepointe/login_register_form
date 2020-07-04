import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React,
{
  useState
} from 'react';
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

const Register = () => {

  const classes = useStyles();

  const [reg_error, setRegError] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('logging in');

    let email: string = e.target.elements.email.value;
    let password: string = e.target.elements.password.value;
    let vpassword: string = e.target.elements.verify_password.value;

    if (password === vpassword) {

      axios.post('/auth/register', {
        email: email,
        password: password,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setRegError(true);
      setTimeout(() => setRegError(false), 2500);
    }

  }

  return (
    <form onSubmit={handleSubmit}>
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
        value="test@test.com"
        // value="ende@test.com"
        placeholder="Email"
      ></TextField>
      <TextField
        className={classes.input}
        name="password"
        fullWidth
        required
        label="Password"
        type="password"
        // value while testing
        value="1bs2b3bd1"
        placeholder="Password"
      ></TextField>
      <TextField
        className={classes.input}
        name="verify_password"
        fullWidth
        required
        label="Verify password"
        type="password"
        // value while testing
        value="1bs2b3bd1"
        placeholder="Verify password"
      ></TextField>
      {reg_error ? "Passwords do not match, try again" : null}
      <Button
        className={classes.button}
        type="submit"
        fullWidth
        variant="outlined"
        color="primary"
      >Register</Button>
    </form>
  )
}

export default Register;