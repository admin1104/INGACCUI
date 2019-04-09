/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class CreateAccount extends PolymerElement {

  static get properties() {
    return {
      customerName:{
        type: String,
        value: ''
      },
      email: {
        type : String
      },
      mobile:{
        type: Number
      },
      pan:{
        type: String
      },
      accountType:{
        type: String
      },
      branchName:{
        type: String
      }
  }
}


createAcntresponse(event){
    var status= event.detail.response.status;
    if( status=="success")
    {     
      alert('Account Success Fully Created  for ',this.$.customerName);
    }
    this.$.regForm.reset();
  }


  _createAccount() {  
      var ajaxuser = this.$.ajaxUser;
      let obj = {"customerName": this.customerName,  
      "email": this.email, 
      "emailId": this.emailId, "mobile": this.mobile,
       "pan": this.pan, 
       "accountType": this.accountType,"branchName": this.branchName};
      ajaxuser.body = obj;
      alert('Account Success Fully Created!');
      //this.$.ajaxUser.generateRequest(); 
  }
  static get template() {
    return html`
    <style include="shared-styles">
    :host {
      display: block;
      padding: 10px;
    }
  </style>
     <p>Create Account! </p>
     <div class="card">        
       
        <iron-ajax id="ajaxUser"
                 url="http://localhost:8090/ING/api/v1/createAccount"
                 method="post"
                 handle-as="json"
                 content-type="application/json"
                 body="[[obj]]"
                 loading="{{loading}}"
                 on-response="createAcntresponse"
                 last-response="{{user}}"></iron-ajax>
        <iron-form id ="regForm">
        <form>
        <paper-input always-float-label label="Customer Name" name="customerName" value={{customerName}}></paper-input> 
        <paper-input always-float-label label="Email" name='email' value={{email}}></paper-input>
        <paper-input always-float-label label="Mobile" name='mobile', value={{mobile}}></paper-input>
        <paper-input always-float-label label="pan" name="pan" value={{pan}}></paper-input>
        <paper-input always-float-label label="accountType" name="accountType" value={{accountType}}></paper-input>
        <paper-input always-float-label label="branchName" name="branchName" value={{branchName}}></paper-input>
        
        <paper-button class="login-button" raised on-click="_createAccount"> Create Account </paper-button>
        </form>
        </iron-form>
      </div>
    `;
  }
}

window.customElements.define('create-account', CreateAccount);
