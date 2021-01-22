import { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux"
import { loggin } from "../store/actions/userActions"




class _Login extends Component {

  state = {
    user: {
      username: '',
      password: '',
      isStayLogged: false
    },
    msg:''
  }

  handleChange = (ev) => {
    const { name, value, type, checked } = ev.target
    const val = (type !== 'checkbox') ? value : checked
    this.setState({ user: { ...this.state.user, [name]: val } })
  }

   doLoggin = async(ev) => {
    ev.preventDefault()
    this.setState({msg:''})
    const {user} = this.state
    const loggedUser = await this.props.loggin(user)
    if (loggedUser) this.props.history.push('/board')
    else this.setState({msg: 'Wrong username or password!'})
  }

  render() {
    const {msg} = this.state
    return (
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div style={{
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Avatar style={{
            margin: '10px',
            backgroundColor: 'blue',
          }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            Sign in
        </Typography>
          <form
            onSubmit={this.doLoggin}
            style={{
              width: '100%',
              marginTop: '5px'
            }} noValidate>
            <TextField
              onChange={this.handleChange}
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="username"
              label="UserName"
              name="username"
              autoFocus

            />
            <TextField
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <p style={{color: 'red'}}>{msg}</p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item>
                <Link href="#/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container >
    );
  }

}
const mapGlobalStateToProps = (state) => {
  return {
    loggedUser: state.userModule.loggedUser
  }
}

const mapDispatchToProps = {
  loggin
}

export const Login = connect(mapGlobalStateToProps, mapDispatchToProps)(_Login)
