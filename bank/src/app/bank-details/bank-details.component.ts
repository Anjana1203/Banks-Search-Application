import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { CacheService } from './../cache.service';


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

	server_url = "https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI";
	server_url1 = "https://vast-shore-74260.herokuapp.com/banks?city=";
favLocalData = []
	ourData = []
  prevData = [[]]
	abc = {}
	pagination = []
	selectedValue = []
	selectedValue1 = []
	searchText;


  constructor(private httpClient: HttpClient,  private cacheService: CacheService) { }
  	ngOnInit() {

      for(let i = 0; i < localStorage.length; i++){
      let key = localStorage.key(i);

      this.favLocalData.push(localStorage.getItem(key))
    }
      // alert(this.favLocalData)

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

  	this.httpClient.get<[]>(this.server_url).subscribe(
		(res) => {
  		this.ourData = res
      // alert(JSON.stringify(res))
      // alert(JSON.stringify(this.ourData))
  		// this.displayedColumns = ['ifsc', 'bank_id', 'branch', 'address'];
   	// 	this.dataSource = new MatTableDataSource(this.ourData);
		});
  	}

	onItemSelect(item: any) {
		console.log(item);
		// alert(JSON.stringify(item))
		this.abc= item["item_text"];
		// alert(this.abc)
		this.httpClient.get<[]>(this.server_url1+this.abc).subscribe(
			(res) => {alert(JSON.stringify(res))
			this.ourData = res
			// this.displayedColumns = ['ifsc', 'bank_id', 'branch', 'address'];
			// this.dataSource = new MatTableDataSource(this.ourData);
		});
	}
	
	onItemDeSelect(item: any) {
		console.log(item)
	}

	handleClick(event: Event, item: any) {
  		console.log('Click!', item)
      // alert(JSON.stringify(item))
      // localStorage.setItem(item["ifsc"], JSON.stringify(item));
      for (let i = 0; i < localStorage.length; i++){
          let key = localStorage.key(i);
          let value = localStorage.getItem(key);
          console.log(key, value);
          // alert(value)
          if(key==item["ifsc"])
          {
            // alert(key)
            this.datathere=1
            // localStorage.removeItem(key);
          }
          // else{
          //   alert("abc")

          //   // localStorage.setItem(item["ifsc"], JSON.stringify(item));
          // }
      }
      if (this.datathere==0) {
        item["flag"] = true
            localStorage.setItem(item["ifsc"], JSON.stringify(item));
            alert("THE BANK ( IFSC: "+ item["ifsc"] +") ADDED IN TO FAVORITES")
        
      }
      else{
            localStorage.removeItem(item["ifsc"]);
            alert("THE BANK ( IFSC: "+ item["ifsc"] +") REMOVED FROM FAVORITES")

            this.datathere=0;

      }
	}

  favorites(event: Event){
      var ourData_temp =[];
      this.ourData = []
      alert(typeof(this.ourData))

    for(let i = 0; i < localStorage.length; i++){
      let key = localStorage.key(i);
      // alert(localStorage.getItem(key))

      ourData_temp.push(localStorage.getItem(key));
      alert(typeof(localStorage[i]))
      // alert(localStorage.getItem(key))
      this.ourData.push(JSON.parse(localStorage.getItem(key)));
            // alert("inside"+JSON.stringify(this.ourData))
          }
          // this.ourData = ourData_temp
            alert("outside"+JSON.stringify(this.ourData))
            // alert(this.ourData[1][5])
            // this.displayedColumns = ['ifsc', 'bank_id', 'branch', 'address'];
            // this.dataSource = new MatTableDataSource(this.ourData);
      
      
        }
      
        backtoall(event: Event){
          this.onItemSelect({ item_id: 1, item_text: 'MUMBAI' });
        }
      
        // handleClick(event: Event, item: any) {)

  //   this.favorite = !this.favorite;

    
  //     console.log('Click!', item)
  //     localStorage.setItem(item["ifsc"], JSON.stringify(item));
  //     for (let i = 0; i < localStorage.length; i++){
  //         let key = localStorage.key(i);
  //         let value = localStorage.getItem(key);
  //         console.log(key, value);
  //         if(key!=item["ifsc"])  
  //     this.buttonName = "add to favorite";
  //   else
  //     this.buttonName = "favorite";
  //   localStorage.removeItem(key);
  //     }
  // }

}


