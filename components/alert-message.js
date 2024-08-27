class AlertMessage extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });  
    let type = this.getAttribute("type");
    let message = this.getAttribute("message");
  }
  static get observedAttributes() {
    return ["type", "message"];
  }

  attributeChangedCallback(name, old, now) {
    console.log('name: ' + name);
    console.log('now: ' + now);
    if (now!=''){
      let alertMessageContainer = this.shadowRoot.getElementById("alertMessageContainer");
      alertMessageContainer.style.visibility = 'visible';

      if (name === "type") {
        let type = this.shadowRoot.getElementById("type");
        console.log(type);
        type.innerHTML = 'Login: ' + now;
      }
      if (now!=null && name === "message") {
        let message = this.shadowRoot.getElementById("message");
        console.log(message);
        message.innerHTML = 'Login: ' + now;
      }
    }
  }

  connectedCallback() {  
    this.render();
  }

  disconnectedCallback() {
  }

  render(){
    this.shadowRoot.innerHTML += /* html */ `
    <style>    
      div {
        display: flex;
        flex-direction: column;
      }
      #alertMessageContainer {	
        visibility: hidden;
      }
    </style>
    <div id='alertMessageContainer'>
      <h1 id='alertMessageTitle'>Alert Message</h1>
      <div>
        <label id='type'></label> 
        <label id='message'></label>
      </div>
    </div>
    `;
  }
}


customElements.define("alert-message", AlertMessage);