import { prependOnceListener } from 'process';
import LoginPage from './loginpage.js';
import WelcomePage from './welcomepage.js';
import RegisterPage from './registerpage.js';
import ErrorBox from './errorBox.js';
import Spinner from './spinner.js';
import sleep from time;
import { time } from 'console';
// import ClipLoader from "react-spinners/ClipLoader";

const { ReactDOM, React, FluentUIReact } = window; // eslint-disable-line

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      registerPage: false,
      loading: false,
      registerUsername: '',
      registerPassword: '',
      registerConfirm: '',
      errorMsg: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleError = this.handleError.bind(this);
    this.attemptLogIn = this.attemptLogIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.toRegisterPage = this.toRegisterPage.bind(this);
    this.toWelcomePage = this.toWelcomePage.bind(this);
    this.toLoginPage = this.toLoginPage.bind(this);
    this.register = this.register.bind(this);
    this.renderLogic = this.renderLogic.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.clearToken = this.clearToken.bind(this);


    // this.sleep = this.sleep.bind(this)
  }

  // sleep(milliseconds) {
  //   console.log("SLEEPING")
  //   const date = Date.now();
  //   let currentDate = null;
  //   do {
  //     currentDate = Date.now();
  //   } while (currentDate - date < milliseconds);
  // }

  componentdidUpdate() {
    if (this.state.loading) {
      this.setState({
        loading: false,
      })
    }
  }

  componentDidMount() {
    Office.initialize = () => {
      // Determine user's version of Office
      if (!Office.context.requirements.isSetSupported('ExcelApi', '1.7')) {
        console.log(
          'Sorry. The add-in uses Excel.js APIs that are not available in your version of Office.',
        );
      }
    };
  }

  handleError(err) {
    const errorMsg = err.message;
    this.setState({
      errorMsg,
    });
  }

  clearToken() {
    return localStorage.removeItem('token');
  }

  async attemptLogIn(username, password) {
    try {
      this.setState({
        loading: true,
      })
      const response = await fetch(
        '../../api/login_user',
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        },
      );
      // wait 2 sec.

      const responseJSON = await response.json();
      this.setState({
        loading: false,
      })
      if (response.ok) {
        localStorage.setItem(
          'token',
          `${responseJSON.username}:${responseJSON.token}`,
        );

        /// change to this.toWelcomePage()
        this.setState({
          loggedIn: true,
        });
      } else {
        this.handleError(responseJSON);
      }
    } catch (err) {
      throw new Error(error);
    }
  }

  toRegisterPage() {
    this.setState({
      // page: { loggedIn: false, registerPage: false },
      // inputs: { user: "", password: "" },
      username: '',
      password: '',
      loggedIn: false,
      registerPage: true,
      loading: false,
      registerUsername: '',
      registerPassword: '',
      registerConfirm: '',
      errorMsg: '',
    });
  }

  toWelcomePage() {
    this.setState({
      // username: this,
      // username used for login welcome message
      password: '',
      loggedIn: true,
      registerPage: false,
      loading: false,
      registerUsername: '',
      registerPassword: '',
      registerConfirm: '',
      errorMsg: '',
    });
  }

  toLoginPage() {
    this.setState({
      username: '',
      password: '',
      loggedIn: true,
      registerPage: false,
      loading: false,
      registerUsername: '',
      registerPassword: '',
      registerConfirm: '',
      errorMsg: '',
    });
  }

  handleRegister(e) {
    e.preventDefault();

    const { registerUsername, registerPassword, registerConfirm } = this.state;

    this.register(registerUsername, registerPassword, registerConfirm);

  }

  async register(username, password, confirm) {
    try {
      this.setState({
        loading: true,
      })
      const response = await fetch('../../api/create_user',
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, confirm }),
        });
      this.setState({
        loading: false
      })
      if (response.ok) {
        const responseJSON = await response.json();

        localStorage.setItem(
          'token',
          `${responseJSON.username}:${responseJSON.token}`,
        );

        this.toWelcomePage();

        return responseJSON;
      }
      const responseJSON = await response.json();
      this.handleError(responseJSON);
    } catch (err) {
      throw new Error(err);
    }
  }

  handleDelete() {

    const token = localStorage.getItem('token');
    this.deleteUser(token);
    this.clearToken();
    this.logOut();

  }

  async deleteUser(token) {
    try {
      this.setState({
        loading: true,
      })
      const response = await fetch('../../api/delete_user', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      this.setState({
        loading: false,
      })
      const responseJSON = await response.json();

      return responseJSON;
    } catch (err) {
      // throw Error(err);
      console.log('there was an error');
      console.log(err);
      // throw Error(err);
      this.handleError(err);
    }
  }

  handleLogout() {
    this.logOut();
  }

  logOut() {
    this.clearToken();
    // change function to "tologinscreen" to help with loading spinner logic

    this.setState({
      username: '',
      password: '',
      loggedIn: false,
      registerPage: false,
      registerUsername: '',
      registerPassword: '',
      registerConfirm: '',
      errorMsg: '',
    });
  }

  handleLogin(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.attemptLogIn(username, password);

  }

  handleChange(e) {
    console.log('click');
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  renderLogic() {
    const {
      registerUsername, registerPassword, registerConfirm, username, password, registerPage, loggedIn, loading
    } = this.state;
    if (registerPage) {
      return (
        <RegisterPage
          registerUsername={registerUsername}
          registerPassword={registerPassword}
          registerConfirm={registerConfirm}
          onInput={this.handleChange}
          onCreate={this.handleRegister}
          onBack={this.logOut}
        >
        </RegisterPage>
      );
    } if (loggedIn) {
      return (
        <WelcomePage
          username={username}
          onLogout={this.handleLogout}
          onDelete={this.handleDelete}
        />
      );
    } if (!loggedIn) {
      return (
        <LoginPage
          username={username}
          password={password}
          onInput={this.handleChange}
          onLogin={this.handleLogin}
          onRegister={this.toRegisterPage}
        />
      );
    }
  }

  render() {
    return (
      <div>
        {this.state.loading ? <Spinner /> : this.renderLogic()}
        <ErrorBox errorMsg={this.state.errorMsg} />

      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  document.getElementById('root'),
);
