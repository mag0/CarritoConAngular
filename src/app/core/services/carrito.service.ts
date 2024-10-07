import { Injectable } from '@angular/core';
import { Carrito } from '../modelo/carrito';
import { Producto } from '../modelo/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private listCarrito: Carrito[] = [];
  
  getCarrito(){
    this.obtenerSesion();
    return this.listCarrito;
  }

  agregar(producto: Producto, cantidad: number = 1){
    this.obtenerSesion();

    //si existe retorna el index y sino retorna -1
    const index = this.listCarrito.findIndex(item => item.producto.id == producto.id);

    if(index == -1){
      const item = new Carrito(producto, cantidad);
      this.listCarrito.push(item);
    }else{
      this.actualizar(index, this.listCarrito[index].cantidad + cantidad);
    }
    this.guardarSession();
  }

  actualizar(index: number, cantidad: number){
    if(index >= 0 && index < this.listCarrito.length){
      this.listCarrito[index].cantidad = cantidad;
      this.guardarSession();
    }
  }

  getCantidad(){
    this.obtenerSesion();
    return this.listCarrito.length;
  }

  getTotal(){
    const total = this.listCarrito.reduce((sum, item) => 
      sum + item.producto.precio * item.cantidad, 0
    );
    return total;
  }

  eliminarItem(index: number){
    if(index >= 0 && index < this.listCarrito.length){
      this.listCarrito.splice(index, 1);
    }
    this.guardarSession();
  }

  guardarSession(){
  }

  obtenerSesion(){
    
  }
}
