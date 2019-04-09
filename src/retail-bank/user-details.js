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

class UserDetails extends PolymerElement {

ready(){
  super.ready();
  this.userinfo =JSON.parse(sessionStorage.getItem("username")) ;
    
  console.log(this.userinfo);
}
static get properties() {
        return {
          userinfo:{

          },
        accntHolder: {
            type: String,
            value:100001000100            
          },         
          totalBalance: {
            type: Number,
            value: 1000000           
          },
          userValue:{
              type: String,
              value:"User1"
          },
          data: Array,
          totalbalance:{
            type: Number,
            value :0
        },
        role:{
          type: String
        },
        accountNumber:{
          type: String
        },
        
        balance:{
          type:String
        }

        };
}




_handleUpdateDetail(){
    this.set('route.path', '/updatedetail');
}

_handleTransaction(){
    this.set('route.path', '/transactionlist');
}

  static get template() {
    return html`
   
      <style>
        :host {
          display: block;

          padding: 10px 20px;
        }
        .handleUpdate-button{
            
            background-color: #f48700;
            color: white;
            font-family: sans-serif; 
          }
          .summary-button{
            
            background-color: #f48700;
            color: white;
            font-family: sans-serif; 
          } 
      </style>

     <p>Welcome [[userValue]] </p>
     <p>Role: [[userinfo.role]]</p>
     <p>accountNumber: [[userinfo.accountNumber]]</p>
     <div class="card">
     <label> Account Number</label>
     <input type ="text" name= "accntHolder" id="accntHolder" value="[[userinfo.accountNumber]]" disabled/>
     <br/>
     <label> Balance</label>

     RS:/<input type ="text" name= "totalBalance" id="totalBalance" value="[[userinfo.balance]]"  disabled/>
        <br/>
        <br/>
     <!--<paper-button class="handleUpdate-button" raised on-click="_handleUpdateDetail"> Update Details </paper-button> -->
     <paper-button class="summary-button" raised on-click="_handleTransaction"> Transaction Summary </paper-button>
     </div>


    `;
  }
}

window.customElements.define('user-details', UserDetails);
