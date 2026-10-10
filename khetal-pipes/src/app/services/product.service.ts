import {
  Inject,
  Injectable,
  PLATFORM_ID,
  signal
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';

import {
  HttpClient
} from '@angular/common/http';

import {
  firstValueFrom
} from 'rxjs';

import {
  Product
} from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /*
  ============================================================
  API CONFIGURATION
  ============================================================

  DEVELOPMENT:
  Keep this empty.
  Products will use localStorage.

  BACKEND:
  Change this to:

  api = 'http://localhost:3000/api';

  Later in production:

  api = 'https://your-domain.com/api';
  */

  private readonly api = '';

  private readonly storageKey = 'khetal-products';

  private readonly isBrowser: boolean;


  /*
  ============================================================
  DEFAULT PRODUCTS
  ============================================================
  */

  private readonly defaultProducts: Product[] = [

    {
      id: 1,
      name: 'MS Pipes',
      category: 'Pipes',

      shortDescription:
        'Reliable mild steel pipes for structural and industrial projects.',

      description:
        'Premium mild steel pipes suitable for fabrication, construction, industrial frameworks and general engineering applications.',

      image:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85',

      featured: true,
      available: true
    },


    {
      id: 2,
      name: 'Galvanised GI Pipes',
      category: 'Pipes',

      shortDescription:
        'Corrosion-resistant pipes for long-lasting performance.',

      description:
        'Galvanised iron pipes suited to projects requiring strength, durability and improved resistance against corrosion.',

      image:
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',

      featured: true,
      available: true
    },


    {
      id: 3,
      name: 'Seamless Pipes',
      category: 'Pipes',

      shortDescription:
        'Seamless piping solutions for demanding applications.',

      description:
        'Durable seamless pipes designed for industrial and engineering requirements where dependable material performance is important.',

      image:
        'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1200&q=85',

      featured: false,
      available: true
    },


    {
      id: 4,
      name: 'MS Angles',
      category: 'Structural Steel',

      shortDescription:
        'Steel angles for fabrication and structural frameworks.',

      description:
        'Mild steel angles used for framing, supports, fabrication, construction and other structural applications.',

      image:
        'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&w=1200&q=85',

      featured: true,
      available: true
    },


    {
      id: 5,
      name: 'MS Bars',
      category: 'Structural Steel',

      shortDescription:
        'Strong steel bars for construction and engineering work.',

      description:
        'Mild steel bars available for fabrication, reinforcement, manufacturing and general engineering requirements.',

      image:
        'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85',

      featured: false,
      available: true
    },


    {
      id: 6,
      name: 'MS Flats',
      category: 'Structural Steel',

      shortDescription:
        'Versatile flat steel products for varied requirements.',

      description:
        'Mild steel flats suitable for industrial fabrication, frames, brackets and general construction work.',

      image:
        'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85',

      featured: false,
      available: true
    },


    {
      id: 7,
      name: 'MS Plates',
      category: 'Plates',

      shortDescription:
        'Heavy-duty steel plates for fabrication and engineering.',

      description:
        'Mild steel plates for construction, manufacturing, machinery, fabrication and industrial applications.',

      image:
        'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=85',

      featured: true,
      available: true
    },


    {
      id: 8,
      name: 'Roofing Sheets',
      category: 'Roofing',

      shortDescription:
        'Dependable roofing materials for industrial projects.',

      description:
        'Roofing sheets suitable for warehouses, industrial structures, commercial buildings and development projects.',

      image:
        'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=85',

      featured: true,
      available: true
    }

  ];


  /*
  ============================================================
  PRODUCTS SIGNAL
  ============================================================
  */

  readonly products = signal<Product[]>([]);


  /*
  ============================================================
  CONSTRUCTOR
  ============================================================
  */

  constructor(
    private readonly http: HttpClient,

    @Inject(PLATFORM_ID)
    platformId: object
  ) {

    this.isBrowser =
      isPlatformBrowser(platformId);

    this.loadProducts();

  }


  /*
  ============================================================
  CHECK API MODE
  ============================================================
  */

  private get apiEnabled(): boolean {

    return this.api.trim().length > 0;

  }


  /*
  ============================================================
  LOAD PRODUCTS
  ============================================================
  */

  private async loadProducts(): Promise<void> {

    /*
    ----------------------------------------------------------
    SSR
    ----------------------------------------------------------
    */

    if (!this.isBrowser) {

      this.products.set([
        ...this.defaultProducts
      ]);

      return;

    }


    /*
    ----------------------------------------------------------
    BACKEND MODE
    ----------------------------------------------------------
    */

    if (this.apiEnabled) {

      try {

        const products =
          await firstValueFrom(
            this.http.get<Product[]>(
              `${this.api}/products`
            )
          );


        this.products.set(
          products
        );

        return;

      } catch (error) {

        console.error(
          'Unable to load products from API:',
          error
        );

        /*
        Fallback to localStorage during development
        if backend is unavailable.
        */

      }

    }


    /*
    ----------------------------------------------------------
    LOCAL STORAGE MODE
    ----------------------------------------------------------
    */

    const storedProducts =
      localStorage.getItem(
        this.storageKey
      );


    if (!storedProducts) {

      this.products.set([
        ...this.defaultProducts
      ]);

      this.saveLocalProducts();

      return;

    }


    try {

      const parsedProducts =
        JSON.parse(
          storedProducts
        ) as Product[];


      this.products.set(
        parsedProducts
      );

    } catch (error) {

      console.error(
        'Unable to load products from localStorage:',
        error
      );


      this.products.set([
        ...this.defaultProducts
      ]);

      this.saveLocalProducts();

    }

  }


  /*
  ============================================================
  LOCAL STORAGE SAVE
  ============================================================
  */

  private saveLocalProducts(): void {

    if (!this.isBrowser) {
      return;
    }


    localStorage.setItem(
      this.storageKey,
      JSON.stringify(
        this.products()
      )
    );

  }


  /*
  ============================================================
  GET PRODUCT
  ============================================================
  */

  getProductById(
    id: number
  ): Product | undefined {

    return this.products().find(
      product =>
        product.id === id
    );

  }


  /*
  ============================================================
  ADD PRODUCT
  ============================================================
  */

  async addProduct(
    product: Omit<Product, 'id'>
  ): Promise<Product | null> {

    /*
    ----------------------------------------------------------
    API
    ----------------------------------------------------------
    */

    if (this.apiEnabled) {

      try {

        const createdProduct =
          await firstValueFrom(
            this.http.post<Product>(
              `${this.api}/products`,
              product
            )
          );


        this.products.update(
          products => [
            createdProduct,
            ...products
          ]
        );


        return createdProduct;

      } catch (error) {

        console.error(
          'Unable to add product through API:',
          error
        );

        return null;

      }

    }


    /*
    ----------------------------------------------------------
    LOCAL
    ----------------------------------------------------------
    */

    const newProduct: Product = {

      ...product,

      id: Date.now()

    };


    this.products.update(
      products => [
        newProduct,
        ...products
      ]
    );


    this.saveLocalProducts();


    return newProduct;

  }


  /*
  ============================================================
  UPDATE PRODUCT
  ============================================================
  */

  async updateProduct(
    updatedProduct: Product
  ): Promise<Product | null> {

    /*
    ----------------------------------------------------------
    API
    ----------------------------------------------------------
    */

    if (this.apiEnabled) {

      try {

        const product =
          await firstValueFrom(
            this.http.put<Product>(
              `${this.api}/products/${updatedProduct.id}`,
              updatedProduct
            )
          );


        this.products.update(
          products =>
            products.map(
              current =>
                current.id === product.id
                  ? product
                  : current
            )
        );


        return product;

      } catch (error) {

        console.error(
          'Unable to update product through API:',
          error
        );

        return null;

      }

    }


    /*
    ----------------------------------------------------------
    LOCAL
    ----------------------------------------------------------
    */

    this.products.update(
      products =>
        products.map(
          product =>
            product.id === updatedProduct.id
              ? { ...updatedProduct }
              : product
        )
    );


    this.saveLocalProducts();


    return updatedProduct;

  }


  /*
  ============================================================
  DELETE PRODUCT
  ============================================================
  */

  async deleteProduct(
    id: number
  ): Promise<boolean> {

    /*
    ----------------------------------------------------------
    API
    ----------------------------------------------------------
    */

    if (this.apiEnabled) {

      try {

        await firstValueFrom(
          this.http.delete(
            `${this.api}/products/${id}`
          )
        );


        this.products.update(
          products =>
            products.filter(
              product =>
                product.id !== id
            )
        );


        return true;

      } catch (error) {

        console.error(
          'Unable to delete product through API:',
          error
        );

        return false;

      }

    }


    /*
    ----------------------------------------------------------
    LOCAL
    ----------------------------------------------------------
    */

    this.products.update(
      products =>
        products.filter(
          product =>
            product.id !== id
        )
    );


    this.saveLocalProducts();


    return true;

  }


  /*
  ============================================================
  RESET PRODUCTS
  ============================================================
  */

  async resetProducts(): Promise<boolean> {

    /*
    ----------------------------------------------------------
    API
    ----------------------------------------------------------
    */

    if (this.apiEnabled) {

      try {

        const products =
          await firstValueFrom(
            this.http.post<Product[]>(
              `${this.api}/products/reset`,
              {}
            )
          );


        this.products.set(
          products
        );


        return true;

      } catch (error) {

        console.error(
          'Unable to reset products through API:',
          error
        );

        return false;

      }

    }


    /*
    ----------------------------------------------------------
    LOCAL
    ----------------------------------------------------------
    */

    this.products.set([
      ...this.defaultProducts
    ]);


    this.saveLocalProducts();


    return true;

  }

}