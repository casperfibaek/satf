/* eslint-disable class-methods-use-this */
import LoginPage from './loginpage.js';
import WelcomePage from './welcomepage.js';
import RegisterPage from './registerpage.js';
import MessageBar from './messageBar.js';
import Spinner from './spinner.js';

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
      loadingMessage: '',
      registerUsername: '',
      registerPassword: '',
      registerConfirm: '',
      displayMessage: false,
      displayMessageText: '',
      displayMessageType: 0,
      satfToken: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.setMessageBar = this.setMessageBar.bind(this);
    this.attemptLogIn = this.attemptLogIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.toRegisterPage = this.toRegisterPage.bind(this);
    this.toWelcomePage = this.toWelcomePage.bind(this);
    this.toLoginPage = this.toLoginPage.bind(this);
    this.register = this.register.bind(this);
    this.renderLogic = this.renderLogic.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.saveToken = this.saveToken.bind(this);
    this.clearToken = this.clearToken.bind(this);
  }

  UNSAFE_componentWillMount() {
    window._save_token = (token: string) => {
      window.localStorage.setItem('satf_token', token);
    };

    window._clear_token = () => {
      window.localStorage.removeItem('satf_token');
    };
  }

  onKeyUp(event) {
    if (event.charCode === 13) { // enter
      if (this.state.registerPage) {
        this.handleRegister();
      } else if (!this.state.loggedIn) {
        this.handleLogin();
      }
    }
  }

  async attemptLogIn(username, password) {
    try {
      this.startLoading('Logging in user..');

      const response = await fetch('../../api/login_user', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const responseJSON = await response.json();

      if (response.ok) {
        this.setState({ satfToken: `${responseJSON.username}:${responseJSON.token}` });
        this.saveToken();
        this.toWelcomePage();
      } else if (responseJSON.message) {
        this.setMessageBar(responseJSON.message, 1);
      } else {
        this.setMessageBar('Unable to login user', 1);
      }
    } catch (err) {
      console.log(err);
      this.setMessageBar('Unable to login user', 1);
    } finally {
      this.stopLoading();
    }
  }

  async register(username, password, confirm) {
    try {
      this.startLoading('Registering user..');

      const response = await fetch('../../api/create_user', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, confirm }),
      });

      const responseJSON = await response.json();

      if (response.ok) {
        this.setState({
          username: this.state.registerUsername,
          password: this.state.registerPassword,
          satfToken: `${responseJSON.username}:${responseJSON.token}`,
        });
        this.saveToken();
        this.toWelcomePage();
      } else if (responseJSON.message) {
        this.setMessageBar(responseJSON.message, 1);
      } else {
        this.setMessageBar('Unable to register user', 1);
      }
    } catch (err) {
      console.log(err);
      this.setMessageBar('Unable to register user', 1);
    } finally {
      this.stopLoading();
    }
  }

  async deleteUser(token) {
    try {
      this.startLoading('Deleting user..');

      const response = await fetch('../../api/delete_user', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const responseJSON = await response.json();

      if (response.ok) {
        this.resetState();
        this.toLoginPage();
        this.setMessageBar('Successfully deleted user', 4);
      } else if (responseJSON.message) {
        this.setMessageBar(responseJSON.message, 1);
      } else {
        this.setMessageBar('Unable to delete user', 1);
      }
    } catch (err) {
      console.log(err);
      this.setMessageBar('Unable to delete user', 1);
    } finally {
      this.stopLoading();
    }
  }

  setMessageBar(message, type) {
    this.setState({
      displayMessage: true,
      displayMessageText: message,
      displayMessageType: type,
    });
  }

  clearMessageBar = () => {
    this.setState({
      displayMessage: false,
      displayMessageText: '',
      displayMessageType: 0,
    });
  }

  saveToken() {
    window._save_token(this.state.satfToken);
  }

  clearToken() {
    window._clear_token();
    this.setState({ satfToken: '' });
  }

  startLoading(message) {
    this.clearMessageBar();
    this.setState({
      loading: true,
      loadingMessage: message,
    });
  }

  stopLoading = () => {
    this.setState({
      loading: false,
      loadingMessage: '',
    });
  }

  resetState() {
    this.clearToken();

    this.setState({
      username: '',
      password: '',
      loggedIn: false,
      registerPage: false,
      loading: false,
      loadingMessage: '',
      registerUsername: '',
      registerPassword: '',
      registerConfirm: '',
      displayMessage: false,
      displayMessageText: '',
      displayMessageType: 0,
    });
  }

  logOut() { this.resetState(); }

  toRegisterPage() {
    this.resetState();
    this.setState({ registerPage: true });
  }

  toWelcomePage() {
    this.setState({
      loggedIn: true,
      registerPage: false,
      displayMessage: false,
      displayMessageText: '',
      displayMessageType: 0,
    });
  }

  toLoginPage() {
    this.resetState();
  }

  handleRegister() {
    this.register(
      this.state.registerUsername,
      this.state.registerPassword,
      this.state.registerConfirm,
    );
  }

  handleDelete() {
    const token = window.localStorage.getItem('token');
    this.deleteUser(token);
  }

  handleLogout() {
    this.logOut();
  }

  handleLogin() {
    this.attemptLogIn(this.state.username, this.state.password);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  renderLogic() {
    if (this.state.registerPage) {
      return (
        <RegisterPage
          registerUsername={this.state.registerUsername}
          registerPassword={this.state.registerPassword}
          registerConfirm={this.state.registerConfirm}
          loading={this.state.loading}
          loadingMessage={this.state.loadingMessage}
          onInput={this.handleChange}
          onCreate={this.handleRegister}
          onBack={this.logOut}
        >
        </RegisterPage>
      );
    } if (this.state.loggedIn) {
      return (
        <WelcomePage
          username={this.state.username}
          onLogout={this.handleLogout}
          onDelete={this.handleDelete}
        />
      );
    } if (!this.state.loggedIn) {
      return (
        <LoginPage
          username={this.state.username}
          password={this.state.password}
          loading={this.state.loading}
          loadingMessage={this.state.loadingMessage}
          onInput={this.handleChange}
          onLogin={this.handleLogin}
          onRegister={this.toRegisterPage}
        />
      );
    }
    return (
      <LoginPage
        username={this.state.username}
        password={this.state.password}
        loading={this.state.loading}
        loadingMessage={this.state.loadingMessage}
        onInput={this.handleChange}
        onLogin={this.handleLogin}
        onRegister={this.toRegisterPage}
      />
    );
  }

  render() {
    return (
      <div id="root_login">
        <FluentUIReact.Image
          src="../assets/images/savings-frontier-banner.png"
          alt="Savings at the Frontier Banner"
          height={300}
        />
        <FluentUIReact.Stack vertical id="stack_login" onKeyPress={this.onKeyUp}>
          {this.renderLogic()}
          <MessageBar
            displayMessage={this.state.displayMessage}
            displayMessageText={this.state.displayMessageText}
            displayMessageType={this.state.displayMessageType}
          />
          <Spinner loading={this.state.loading} loadingMessage={this.state.loadingMessage}/>
        </FluentUIReact.Stack>
      </div>
    );
  }
}

ReactDOM.render(<React.StrictMode><Login /></React.StrictMode>, document.getElementById('root'));