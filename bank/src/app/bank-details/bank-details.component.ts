import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';



@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})

export class BankDetailsComponent implements OnInit {

  public favorite:boolean = true;
  public buttonName:any = 'add to favorite';

	dropdownList = [];
	selectedItems = [];
	dropdownSettings = {};
	dataSource;
	displayedColumns;
  datathere = 0;
  selectedPlace = [];

	server_url = "https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI";
	server_url1 = "https://vast-shore-74260.herokuapp.com/banks?city=";
  favLocalData = []
	ourData = []
  
	abc = {}
	pagination = []
	selectedValue = []
	selectedValue1 = []
	searchText;


  constructor(private httpClient: HttpClient) { }
  	ngOnInit() {

  	this.pagination = [
       {id: 1, val: "5"},
       {id: 2, val: "10"},
       {id: 3, val: "15"},
       {id: 4, val: "20"},
       {id: 5, val: "50"}
     ];
     this.selectedValue1 =  [{val:"5"}];
       
    this.selectedValue = this.selectedValue1["val"];
	this.dropdownList = [
	      { item_id: 1, item_text: 'MUMBAI' },
	      { item_id: 2, item_text: 'BANGALORE' },
	      { item_id: 3, item_text: 'PUNE' },
	      { item_id: 4, item_text: 'NAVSARI' },
	      { item_id: 5, item_text: 'NEW DELHI' }
	    ];
    this.selectedItems = [
      { item_id: 1, item_text: 'MUMBAI' },
    ];
	this.dropdownSettings = {
	      singleSelection: true,
	      idField: 'item_id',
	      textField: 'item_text',
	      itemsShowLimit: 3,
	    };
// Get the data from Api (by default it shows details of banks in Mumbai)
  	this.httpClient.get<[]>(this.server_url).subscribe(
		(res) => {
  		this.ourData = res
		});
  	}

// showing the banks & it's details for a particular place when select 
	onItemSelect(item: any) {
		console.log(item);
    this.selectedPlace = item;
		this.abc= item["item_text"];
		this.httpClient.get<[]>(this.server_url1+this.abc).subscribe(
			(res) => {
			this.ourData = res
		});
	}
	
	onItemDeSelect(item: any) {
		//console.log(item)
	}

// Hanlde when click on add to favourite button(or remove)
	handleClick(event: Event, item: any) {
      for (let i = 0; i < localStorage.length; i++){
          let key = localStorage.key(i);
          let value = localStorage.getItem(key);
          if(key==item["ifsc"])
          {
            
            this.datathere=1
            
          }
          
      }
      if (this.datathere==0) {
        // item["flag"] = true
            localStorage.setItem(item["ifsc"], JSON.stringify(item));
            alert("THE BANK ( IFSC: "+ item["ifsc"] +") ADDED IN TO FAVORITES")        
      }
      else{
            localStorage.removeItem(item["ifsc"]);
            alert("THE BANK ( IFSC: "+ item["ifsc"] +") REMOVED FROM FAVORITES")
            this.datathere=0;
      }
	}

//handle when click on my favorite banks button 
  favorites(event: Event){
      var ourData_temp =[];
      this.ourData = []
      

    for(let i = 0; i < localStorage.length; i++){
      let key = localStorage.key(i);
      ourData_temp.push(localStorage.getItem(key));
      
      this.ourData.push(JSON.parse(localStorage.getItem(key)));
            
          }
           
        }


 //handles when click on "back to all Banks" button     
        backtoall(event: Event){
          if (this.selectedPlace.length==0) {
            // alert("in []"+ JSON.stringify(this.selectedItems[0]) + typeof(this.selectedItems))
            this.onItemSelect(this.selectedItems[0])
          }
          else
          {
            // alert("in else" + JSON.stringify(this.selectedPlace) + typeof(this.selectedPlace))
            this.onItemSelect(this.selectedPlace);
          }
        }
      
}


