import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  cartProducts: { product: Product; quantity: number }[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    // Lógica para cargar productos del carrito desde el servicio
  }

  addToCart(product: Product): void {
    const existingProduct = this.cartProducts.find(
      (p) => p.product.id_product === product.id_product
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cartProducts.push({ product, quantity: 1 });
    }
  }

  updateQuantity(cartItem: { product: Product; quantity: number }, newQuantity: number): void {
    if (newQuantity > 0) {
      cartItem.quantity = newQuantity;
    }
  }

  removeFromCart(productId: number): void {
    this.cartProducts = this.cartProducts.filter(
      (item) => item.product.id_product !== productId
    );
  }

  checkout(): void {
    // Lógica para procesar la compra (ejemplo: enviar los datos al backend)
    console.log('Compra realizada:', this.cartProducts);
    this.cartProducts = []; // Vaciar carrito después de la compra
  }

}
