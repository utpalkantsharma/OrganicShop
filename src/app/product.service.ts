import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    console.log("saving product");
    return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products');
  }

  get(productId){
    return this.db.object('/products/'+productId);
  }

  update(productId, product){
    console.log('updating product');
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }

}
