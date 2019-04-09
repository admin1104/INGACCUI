import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class UpdateDetail extends PolymerElement {

  static get properties(){
    return{
      emailId : {
        type: String,
        value:"test@gmail.com"
        
      },
      mobNumber:{
        type: String,
        value:"12345 66779"
       
      },
      panCard:{
        type: String,
        value: 'ABCFD1863A'
      },
    }
  }

  updateUser(){
    if(this.$newCourseForm.validate()){
      var updateUserAjax = this.$.updateUserAjax;
      updateUserAjax.url= "http://localhost:3000/course/rest/update/'"+[[]]+"'"; 
      updateUserAjax.method = "POST"; 
      // var obj= {courseName: this.courseName,
      //   courseTitle: this.courseTitle,
      //    link: this.link, 
      //    topic: this.formTopics(this.topic.split(','))}
      updateUserAjax.body=(obj) ;  
    
      //this.$.newCourseAjax.generateRequest();
    }
  }
  static get template() {
    return html`
    <style include="shared-styles">
    :host {
      display: block;
      padding: 10px;
    }
  </style>
  <iron-ajax
  auto
  id= "updateUserAjax"           
  handle-as="json"
  on-response="handleResponse"
  debounce-duration="300"
  content-type="application/json">
  </iron-ajax>
  <div class="card">        
    <h1>Update Details</h1>
    <iron-form>
    <form id="usrUpdateId">
    <paper-input always-float-label label="Email Id" name="emailId" value={{emailId}}></paper-input>
    <paper-input always-float-label label="Contact Number" name="mobNumber" value={{mobNumber}}></paper-input>
    <paper-input always-float-label label="Pan Card" name="panCard" value={{panCard}}></paper-input>
    <paper-input always-float-label label="Address" name="address" value={{address}} disabled></paper-input>
    <p style="color":"red">Note: To Update Address, please visit the branch and provide the KYC documents</p>
    <paper-button raised class="indigo" on-click="updateUser">Update User Detail</paper-button>
    
    </form>
    </iron-form>
    
  </div>
    `;
  }
}

window.customElements.define('update-detail', UpdateDetail);
