import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pagination } from './models/paging';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Client';
  constructor(private http:HttpClient){}
  products:any[]=[];
  ngOnInit(): void {
      this.http.get("https://localhost:7275/api/product").subscribe({
        next :(response :any) => this.products = response.data,
        error:error => console.error(error),
        complete:() =>{
          console.log("Requset complet");
          console.log("Extra statment");


        }


      })
  }
}


