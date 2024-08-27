class UserLogin extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });  
  }

  connectedCallback() {  
    this.render();
    const formLogin = this.shadowRoot.getElementById('login');

    formLogin.addEventListener('submit', this.submitFormLogin.bind(this));
  }

  submitFormLogin(event){
    event.preventDefault();
    const userName = this.shadowRoot.querySelector('#user').value;
    const password = this.shadowRoot.querySelector('#password').value;
 
    if (userName === 'admin' && password === 'admin') {
      console.log("Login success");
      this._throwCustomEvent('user.login:login-success', {username: userName});
    } 
    else {
      console.log("Login error");
      this._throwCustomEvent('user.login:login-error', {errorMessage: 'Usuario o contraseña incorrectos'});
    }

  }

  _throwCustomEvent(eventName, detail){
    let event = new CustomEvent(eventName, {
      detail: detail,
      bubbles: true,
      composed: true
    });
    console.log("Event", event);
    this.dispatchEvent(event);
  }

  disconnectedCallback() {
  }

  render(){
    this.shadowRoot.innerHTML += /* html */ `
    <style>
      .login-form {
        display: flex;
        flex-direction: column;
        width: 300px;
        margin: 0 auto;
      }
      .login-form input{
        padding: 5px;
        margin-bottom: 5px;
      }
      .login-form button{
        width: 300px;
        margin: 0 auto;
        padding: 3px;
      }
    </style>

    <form id="login" class="login-form">
      <input id="user" type="text" placeholder="Usuario" required>
      <input id="password" type="password" placeholder="Contraseña" required>
      <button type="submit">Login</button>
    </form>
    `;
  }
}


customElements.define('user-login', UserLogin);