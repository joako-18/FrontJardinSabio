import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model'; // Crear un modelo para tipar productos

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() product!: Product; // Producto recibido como entrada
  @Output() addToCart = new EventEmitter<Product>(); // Emitir evento al agregar al carrito

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}

