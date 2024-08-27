class LoginPage extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });  
    this.render();
  }

  connectedCallback() {  

    const userLogin = this.shadowRoot.querySelector('user-login');
    const alertMessage = this.shadowRoot.querySelector('alert-message');
    
    this.shadowRoot.addEventListener('user.login:login-success', this.LoginSuccess.bind(this));
    this.shadowRoot.addEventListener('user.login:login-error', this.LoginError.bind(this));
  }
  
  LoginSuccess(event){
    let alertMessage = this.shadowRoot.querySelector('alert-message');
    alertMessage.setAttribute("type", "success");
    alertMessage.setAttribute("message", "Hello " + event.detail.username);
  }

  LoginError(event){
    let alertMessage = this.shadowRoot.querySelector('alert-message');
    alertMessage.setAttribute("type", "error");
    alertMessage.setAttribute("message", event.detail.errorMessage);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('user.login:login-success', this.LoginSuccess.bind(this));
    this.shadowRoot.removeEventListener('user.login:login-error', this.LoginError.bind(this));
  }

  render(){
    this.shadowRoot.innerHTML += /* html */ `
    <style>    
      :host .container{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    </style>

    <div class="container">
      <user-login></user-login>
      <alert-message type message></alert-message>
    </div>      
    `;
  }
}

customElements.define("login-page", LoginPage);