import { HttpClient } from '@angular/common/http';  
import { inject, Injectable } from '@angular/core';  
import { Producto } from '../modelo/producto';  
import { map } from 'rxjs/operators';

@Injectable({  
  providedIn: 'root'  
})  
export class ProductoService {  
  private http = inject(HttpClient);  
  // URL de la Fake Store API  
  private url: string = 'https://fakestoreapi.com/products'; // Cambia a la URL de la API  

  getProductos() {  
    return this.http.get<any[]>(this.url).pipe(  
      map((productos) =>   
        productos.map((item) => {  
          const p = new Producto();
          p.id = item.id;  
          p.title = item.title;  
          p.price = item.price;  
          p.description = item.description;  
          p.image = item.image;  
          p.rate = item.rating.rate; // Extraer rate  
          p.count = item.rating.count; // Extraer count  
          return p;  
        })  
      )  
    );  
  }  
}
