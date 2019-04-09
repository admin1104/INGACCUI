import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'ag-grid-polymer';


class TransactionList extends PolymerElement{

  constructor() {
    super();
    const rowData = [
      {
        "description": "transctopon 3",
        "categorySelected": "Travel",
        "paymentSelected": "Recieve Payment",
        "amount": "1000",
        "transdate": "2019-03-23",
        "id": 2
      },
      {
        "description": "trans 3",
        "categorySelected": "Loans",
        "paymentSelected": "Make Payment",
        "amount": "1000",
        "transdate": "2019-03-23",
        "id": 3
      },
      {
        "description": "transtion4",
        "categorySelected": "Travel",
        "paymentSelected": "Recieve Payment",
        "amount": "3000",
        "transdate": "2019-03-23",
        "id": 4
      },
      {
        "description": "transaction5",
        "categorySelected": "Utility Bills",
        "paymentSelected": "Make Payment",
        "amount": "5000",
        "transdate": "2019-03-23",
        "id": 7
      },
      {
        "description": "for others",
        "categorySelected": "Misc.",
        "paymentSelected": "Recieve Payment",
        "amount": "3000",
        "transdate": "2019-03-23",
        "id": 8
      },
      {
        "description": "gfghfh",
        "categorySelected": "Travel",
        "paymentSelected": "Recieve Payment",
        "amount": "9000",
        "transdate": "2019-03-06",
        "id": 9
      },
      {
        "description": "balance transfer",
        "categorySelected": "Utility Bills",
        "paymentSelected": "Recieve Payment",
        "amount": "10000",
        "transdate": "2019-03-23",
        "totalbalance": 10000,
        "id": 10
      },
      {
        "description": "testTransaction",
        "categorySelected": "Travel",
        "paymentSelected": "Recieve Payment",
        "amount": "1000",
        "transdate": "2019-03-12",
        "totalbalance": 0,
        "id": 11
      },
      {
        "description": "trran3",
        "categorySelected": "Loans",
        "paymentSelected": "Recieve Payment",
        "amount": "1000",
        "transdate": "2019-03-12",
        "totalbalance": 0,
        "id": 12
      },
      {
        "description": "for electroc",
        "categorySelected": "Utility Bills",
        "paymentSelected": "Recieve Payment",
        "amount": "1000",
        "transdate": "2019-03-25",
        "totalbalance": 0,
        "id": 13
      },
      {
        "description": "for electroc",
        "categorySelected": "Utility Bills",
        "paymentSelected": "Recieve Payment",
        "amount": "1000",
        "transdate": "2019-03-25",
        "totalbalance": 0,
        "id": 14
      },
      {
        "description": "for electroc",
        "categorySelected": "Utility Bills",
        "paymentSelected": "Recieve Payment",
        "amount": "1000",
        "transdate": "2019-03-25",
        "totalbalance": 0,
        "id": 15
      },
      {
        "description": "transaction others",
        "categorySelected": "Shopping",
        "paymentSelected": "Recieve Payment",
        "amount": "1000",
        "transdate": "2019-03-25",
        "totalbalance": 0,
        "id": 16
      },
      {
        "description": "transaction detail",
        "categorySelected": "Loans",
        "paymentSelected": "Make Payment",
        "amount": "32000",
        "transdate": "2019-03-25",
        "totalbalance": 32000,
        "id": 17
      }
    ];
    this.columnDefs = [
      { headerName: "Id", field: "id" , sortable: true, filter: true },
      { headerName: "description", field: "description" , sortable: true, filter: true },
      { headerName: "categorySelected", field: "categorySelected" , sortable: true, filter: true },
      { headerName: "amount", field: "amount" , sortable: true, filter: true },
      { headerName: "transdate", field: "transdate" , sortable: true, filter: true },
      { headerName: "paymentSelected", field: "paymentSelected", sortable: true, filter: true  },
    ];

    this.rowData = rowData;

    this.gridOptions = {
      pagination: true,
    }
  }
  
  firstDataRendered(params) {
    params.api.sizeColumnsToFit()
  }

  
    static get properties() {
        return {
            data: Array,
            totalbalance:{
              type: Number,
              value :0
          }
        }
    }

   
    _handleResponse(event) {
      this.rowData = event.detail.response;
        this.data = event.detail.response;
        //this.updateItemsFromPage(1);
        for(let i=0; i < this.data.length; i++){
          var paytype = this.data[i].paymentSelected
          if(paytype === "Recieve Payment"){
              this.totalbalance += JSON.parse(this.data[i].amount);
          } 
      }
      console.log("total=",this.totalbalance);
      this.dispatchEvent(new CustomEvent('totalAmount', 
      {bubbles: true, composed: true, detail: {totalbalance: this.totalbalance}}));
    }

    updateItemsFromPage(page) {
      const grid = this.$.transGrid;
           const pagesControl = this.$.pages;
             if (page === undefined) {
               return;
             }
             if (!this.pages) {
               this.pages = Array.apply(null, {length: Math.ceil(this.data.length / grid.pageSize)}).map(function(item, index) {
                 return index + 1;
               });
               const prevBtn = window.document.createElement('button');
               prevBtn.textContent = '<';
               prevBtn.addEventListener('click', function() {
                 const selectedPage = parseInt(pagesControl.querySelector('[selected]').textContent);
                 this.updateItemsFromPage(selectedPage - 1);
               }.bind(this));
               pagesControl.appendChild(prevBtn);
               
               var self = this;
               this.pages.forEach(function(pageNumber) {
                 const pageBtn = window.document.createElement('button');
                 pageBtn.textContent = pageNumber;
                 pageBtn.addEventListener('click', function(e) {
                   self.updateItemsFromPage(parseInt(e.target.textContent));
                 }.bind(self));
                 if (pageNumber === page) {
                   pageBtn.setAttribute('selected', true);
                 }
                 pagesControl.appendChild(pageBtn);
               });
               const nextBtn = window.document.createElement('button');
               nextBtn.textContent = '>';
               nextBtn.addEventListener('click', function(e) {
                 const selectedPage = parseInt(pagesControl.querySelector('[selected]').textContent);
                 this.updateItemsFromPage(selectedPage + 1);
               }.bind(this));
               pagesControl.appendChild(nextBtn);
             }
             const buttons = Array.from(pagesControl.children);
             var self = this;
             buttons.forEach(function(btn, index) {
               if (parseInt(btn.textContent) === page) {
                 btn.setAttribute('selected', true);
               } else {
                 btn.removeAttribute('selected');
               }
               if (index === 0) {
                 if (page === 1) {
                   btn.setAttribute('disabled', '');
                 } else {
                   btn.removeAttribute('disabled');
                 }
               }
               if (index === buttons.length - 1) {
                 if (page ===  self.pages.length) {
                   btn.setAttribute('disabled', '');
                 } else {
                   btn.removeAttribute('disabled');
                 }
               }
             });
             var start = (page - 1) * grid.pageSize;
             var end = page * grid.pageSize;
             grid.items = this.data.slice(start, end);
           }

    static get template(){
        return html`
        <link rel="stylesheet" href="../../node_modules/ag-grid-community/dist/styles/ag-grid.css">
        <link rel="stylesheet" href="../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css">

        <style>        
            paper-button.indigo {
            background-color: gray;
            color: white;           
            }

            #pages {
              display: flex;
              flex-wrap: wrap;
              margin: 20px;
            }
          
            #pages > button {
              user-select: none;
              padding: 5px;
              margin: 0 5px;
              border-radius: 10%;
              border: 0;
              background: transparent;
              font: inherit;
              outline: none;
              cursor: pointer;
            }
          
            #pages > button:not([disabled]):hover,
            #pages > button:focus {
              color: #ccc;
              background-color: #eee;
            }
          
            #pages > button[selected] {
              font-weight: bold;
              color: white;
              background-color: #ccc;
            }
          
            #pages > button[disabled] {
              opacity: 0.5;
              cursor: default;
            }
        </style>
        <iron-ajax 
        auto 
        id="ajax"
        url="http://localhost:3000/details"
        on-response="_handleResponse"
        > </iron-ajax>
        <div>Total balance : {{totalbalance}} /-.</div><br/>

        <ag-grid-polymer style="width: 100%; height: 350px;"
                         class="ag-theme-balham"
                         rowData="{{rowData}}"
                         columnDefs="{{columnDefs}}" gridOptions ="{{gridOptions}}"
                         on-first-data-rendered="{{firstDataRendered}}"
        ></ag-grid-polymer>
    

        <!--<vaadin-grid items={{data}} id="transGrid" column-reordering-allowed page-size="10" height-by-rows>
        <vaadin-grid-column>
          <template class="header">Id</template>
          <template>[[item.id]]</template>
       </vaadin-grid-column>
      <vaadin-grid-column>
          <template class="header">Description</template>
          <template>[[item.description]]</template>
        </vaadin-grid-column>
        <vaadin-grid-column>
          <template class="header">Spend Category</template>
          <template>[[item.categorySelected]]</template>
        </vaadin-grid-column>
        <vaadin-grid-column>
          <template class="header">Amount</template>
          <template>[[item.amount]]</template>
        </vaadin-grid-column>
        <vaadin-grid-column>
          <template class="header">Transaction Date</template>
          <template>[[item.transdate]]</template>
        </vaadin-grid-column>
        <vaadin-grid-column>
            <template class="header">Payment Type</template>
            <template>[[item.paymentSelected]]</template>
          </vaadin-grid-column>          
      </vaadin-grid> -->
      
      <div id="pages"></div>
        `
    }


}
window.customElements.define('transaction-list',TransactionList);
