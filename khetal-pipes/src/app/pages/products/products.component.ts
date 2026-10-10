import {
  Component,
  computed,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  // Search text
  searchText = signal<string>('');

  // Selected category
  selectedCategory = signal<string>('All');

  // Currently selected product
  selectedProduct = signal<Product | null>(null);

  constructor(
    public productService: ProductService
  ) {}

  // Get unique categories
  readonly categories = computed<string[]>(() => {
    const productCategories = this.productService
      .products()
      .map(product => product.category);

    return [
      'All',
      ...new Set(productCategories)
    ];
  });

  // Filter products based on search and category
  readonly filteredProducts = computed<Product[]>(() => {

    const search = this.searchText()
      .trim()
      .toLowerCase();

    const category = this.selectedCategory();

    return this.productService
      .products()
      .filter(product => {

        const matchesSearch =
          product.name
            .toLowerCase()
            .includes(search) ||

          product.category
            .toLowerCase()
            .includes(search) ||

          product.shortDescription
            .toLowerCase()
            .includes(search);

        const matchesCategory =
          category === 'All' ||
          product.category === category;

        return matchesSearch && matchesCategory;
      });
  });

  // Update search text
  updateSearch(value: string): void {
    this.searchText.set(value);
  }

  // Select category
  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  // Open product details
  openProduct(product: Product): void {
    this.selectedProduct.set(product);
  }

  // Close product details
  closeProduct(): void {
    this.selectedProduct.set(null);
  }
}

