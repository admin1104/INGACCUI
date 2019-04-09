import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-form/iron-form.js';

class MyLogin extends PolymerElement {
  static get properties(){
    return{
      userName : {
        type: String,
        
      },
      password:{
        type: String,
       
      },
      userinfo:{

      }
    }
  }

   _handleLogin(event){
    //  var status = event.detail;
    //  if(status===1){
    //    sessionStorage.setItem('username',this.userName);
    //    this.dispatchEvent(new CustomEvent('userdetails', 
    //    {bubbles: true, composed: true, detail: {checkUser: true}}));
    //    alert('Login successfully');
    //  }

    // if(this.$.loginForm.validate()){
      var ajaxLogin = this.$.ajaxLogin;
      //let objUser = {"userName":this.userName, "password": this.password};
      //console.log(objUser);
      ajaxLogin.url = config.baseUrl + "/api/v1/login";
      ajaxLogin.method="post";
      ajaxLogin.body= {"userName":this.userName, "password": this.password};
      ajaxLogin.generateRequest();      
     
     
   }

   loginCredential(event){
     let status = {};
     this.userinfo = event.detail.response;
     let user =status.role;
     let acnt = status.accountNumber;
     let acntHolder= status.accountHolderName;
     let balance= status.balance;
    
    if(status==="success"){

      sessionStorage.setItem('username',this.userinfo);
      // this.dispatchEvent(new CustomEvent('userdetails', 
      // {bubbles: true, composed: true, detail: {checkUser: true}}));
      alert('Login successfully' ,"role:",user,"accountNumber:" ,acnt,"Holder:", acntHolder,"balance:",balance);
    }
    
    this.dispatchEvent(new CustomEvent('userinfo', 
      {bubbles: true, composed: true, detail: {"userinfo": this.userinfo}}));
    this.$.loginForm.reset();
    this.set('route.path', '/userdetails');
  }
 
  static get template() {
    return html`
    <style>
        .login-button{
          margin-left: 563px;
          background-color: #f48700;
          color: white;
          font-family: sans-serif; 
        } 
        .btnAddPet{
          float: right;
          bottom: 46px;
        }
       </style>
  <div class="card">        
    <h1>Login</h1>
    <iron-ajax id="ajaxLogin"            
             method:"post"
             handle-as="json"
             content-type="application/json"
             body=[[objUser]]                  
             on-response="loginCredential"></iron-ajax>


    <iron-form id=loginForm>
    <form>
    <div class="card"> 
    <paper-input 
      type="text"
      auto-validate required 
      label="User Name"
      name="userName"
      value={{userName}}
      error-message="User Name is Required!"
      ></paper-input>

    <paper-input
      type="password" 
      label="password"
      name="password"
      value={{password}}
      auto-validate required
      error-message="password is Required"></paper-input>

    <paper-button class="login-button" raised on-click="_handleLogin"> Login </paper-button>
    </div>
    </form>
    </iron-form>
  </div>
    `;
  }
}

window.customElements.define('my-login', MyLogin);
