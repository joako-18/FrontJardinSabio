import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model'; // Crear un modelo para tipar productos
import { CardComponent } from '../../components/card/card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, CardComponent, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
})
export class TiendaComponent implements OnInit {
  products: Product[] = []; // Lista de productos para mostrar
  filteredProducts: Product[] = []; // Lista filtrada según búsqueda
  searchQuery: string = ''; // Búsqueda de usuario

  constructor(private productService: ProductService, private cartService: CartService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
      console.log(this.products);
    });
  }

  onSearchChange(): void {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addToCart(product: Product): void {
    const userId = this.tokenService.getUserIdFromToken(); // Obtén el ID del usuario desde el token
    const quantity = 1; // Cantidad fija para este ejemplo

    if (!userId) {
      console.error('Usuario no autenticado');
      return;
    }

    this.cartService.addToCart(userId, product.id_product, quantity).subscribe({
      next: () => console.log(`${product.name} agregado al carrito`),
      error: (err) => console.error('Error al agregar al carrito:', err)
    });
  }
}
