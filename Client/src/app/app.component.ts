import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pagination } from './shared/models/paging';
import { Product } from './shared/models/product';

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
      this.http.get<Pagination<Product[]>>("https://localhost:7275/api/product").subscribe({
        next :(response) => this.products = response.data,
        error:error => console.error(error),
        complete:() =>{
          console.log("Requset complet");
          console.log("Extra statment");


        }


      })
  }
}


