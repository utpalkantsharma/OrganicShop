import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/product';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  dataTableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll()
    .subscribe(products => {
      this.filteredProducts = this.products = products;

      this.initializeTable(products);
      
    });
  }

  private initializeTable(products: Product[]){
    this.dataTableResource = new DataTableResource(products);
    this.dataTableResource.query({offset:0})
    .then(items=>this.items=items).catch(e=>console.error(e));
    this.dataTableResource.count().then(itemCount => this.itemCount = itemCount);
  }

  reloadItems(params){
    if(!this.dataTableResource) return;
      this.dataTableResource.query(params)
    .then(items=>this.items=items)
  }

  filter(query: string){
    this.filteredProducts = (query) ? 
    this.products.filter(p => p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())): 
    this.products;
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
