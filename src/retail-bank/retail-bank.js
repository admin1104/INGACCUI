import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';

//import '@polymer/iron-ajax';
import '@polymer/paper-button';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-column-group.js'
import '@vaadin/vaadin-grid/src/vaadin-grid-templatizer.js';
import '@vaadin/vaadin-grid/src/vaadin-grid-styles.js';



// Set Polymer's root path to the same value we passed to our service worker
setPassiveTouchGestures(true);
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

/**
 * @customElement
 * @polymer
 */
class RetailBank extends PolymerElement {

  ready(){
    super.ready();
    window.addEventListener('userinfo', function(e){
      console.log('EVENT - ',e);
      if(e.detail.userinfo){
        this.userinfo=e.detail.userinfo;
      }
    })
  }
  

  static get template() {
    return html`
    <style>
    :host {
      --app-primary-color: #f48700;
      --app-secondary-color: black;
      display: block;
    }
    app-drawer-layout:not([narrow]) [drawer-toggle] {
      display: none;
    }
    app-header {
      color: #fff;
      background-color: var(--app-primary-color);
    }
    app-header paper-icon-button {
      --paper-icon-button-ink-color: white;
    }
    .drawer-list {
      margin: 0 20px;
    }
    .drawer-list a {
      display: block;
      padding: 0 16px;
      text-decoration: none;
      color: var(--app-secondary-color);
      line-height: 40px;
    }
    .drawer-list a.iron-selected {
      color: black;
      font-weight: bold;
    }
  </style>
  <app-location route="{{route}}" url-space-regex="^[[rootPath]]"  use-hash-as-path>
  </app-location>
  <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
  </app-route>
  <app-drawer-layout fullbleed="" narrow="{{narrow}}">
    <!-- Drawer content -->
    <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
      <app-toolbar>Menu</app-toolbar>
      <iron-selector selected="[[page]]" attr-for-selected="name"
       class="drawer-list" role="navigation">
        <a name="mylogin" route="{{route}}" href="#/mylogin">Login</a>
        <a name="userdetails" route="{{route}}" href="#/userdetails">User Summary</a>
        <a name="updatedetail" route="{{route}}" href="#/updatedetail">Update User Detail</a>
        <a name="createaccount" route="{{route}}" href="#/createaccount">Create Account</a>
        <a name="transactionlist" route="{{route}}" href="#/transactionlist"></a>
        
       
      </iron-selector>
    </app-drawer>
    <!-- Main content -->
    <app-header-layout has-scrolling-region="">
      <app-header slot="header" condenses="" reveals="" effects="waterfall">
        <app-toolbar>
          <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
          <div main-title="">RBA </div>
        </app-toolbar>
      </app-header>
      <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
        
        <my-login route="{{route}}" name="mylogin"></my-login>
        <user-details  route="{{route}}" name="userdetails"></user-details>
        <update-detail  route="{{route}}" name="updatedetail" users = "{{userinfo}}"></update-detail>
        <create-account route="{{route}}" name="createaccount"></create-account>
        <transaction-list route="{{route}}" name="transactionlist"></transaction-list>
        <not-found name="view404"></not-found>
      </iron-pages>
    </app-header-layout>
  </app-drawer-layout>
`;
}

static get properties() {
return {
  page: {
    type: String,
    reflectToAttribute: true,
    observer: '_pageChanged'
  },
  userCheck: {
    type: Boolean,
    value : false,   
  } , 
  routeData: Object,
  subroute: Object
};
}

static get observers() {
return [
    '_routePageChanged(routeData.page)'
];
}

_routePageChanged(page) {
 // Show the corresponding page according to the route.
 //
 // If no page was found in the route data, page will be an empty string.
 // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
 if (!page) {
  this.page = 'mylogin';
} else if (['mylogin','userdetails','createaccount','updatedetail','transactionlist'].indexOf(page) !== -1) {
  this.page = page;
} else {
  this.page = 'view404';
}

// Close a non-persistent drawer when the page & route are changed.
if (!this.$.drawer.persistent) {
  this.$.drawer.close();
}

// Close a non-persistent drawer when the page & route are changed.
if (!this.$.drawer.persistent) {
  this.$.drawer.close();
}
}


_pageChanged(page) {    
  switch (page) {     
    case 'mylogin':
      import('./my-login.js');
      break;
    case 'createaccount':
      import('./create-account.js');
      break;
      case 'userdetails':
      import('./user-details.js');
      break;
      case 'updatedetail':
      import('./update-detail.js');
      break;
      case 'transactionlist':
      import('./transaction-list.js');
      case 'view404':
      import('./my-view404.js');
      break;
}
}

}

window.customElements.define('retail-bank', RetailBank);