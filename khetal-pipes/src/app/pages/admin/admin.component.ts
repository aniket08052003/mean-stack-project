import {
  Component,
  computed,
  Inject,
  PLATFORM_ID,
  signal
} from '@angular/core';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Product
} from '../../models/product';

import {
  ProductService
} from '../../services/product.service';


interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  joined: string;
}


interface AdminUser {
  id: number;
  username: string;
  password: string;
  role: string;
}


@Component({
  selector: 'app-admin',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './admin.component.html',

  styleUrl: './admin.component.css'
})
export class AdminComponent {
  private readonly isBrowser: boolean;

  /* ==========================================
     SIDEBAR
  ========================================== */

  activeSection = signal('dashboard');

  sidebarOpen = signal(true);


  /* ==========================================
     PRODUCT
  ========================================== */

  selectedProduct = signal<Product | null>(null);

  showProductModal = signal(false);

  productMode = signal<'add' | 'edit'>('add');


  productForm = signal<Partial<Product>>({
    name: '',
    category: '',
    shortDescription: '',
    description: '',
    image: '',
    featured: false,
    available: true
  });


  /* ==========================================
     USERS
  ========================================== */

  users = signal<User[]>([
    {
      id: 1,
      name: 'Rahul Patil',
      email: 'rahul@example.com',
      phone: '+91 9876543210',
      status: 'Active',
      joined: '12 Sep 2026'
    },

    {
      id: 2,
      name: 'Amit Shah',
      email: 'amit@example.com',
      phone: '+91 9823456789',
      status: 'Active',
      joined: '10 Sep 2026'
    },

    {
      id: 3,
      name: 'Sneha Joshi',
      email: 'sneha@example.com',
      phone: '+91 9765432100',
      status: 'Inactive',
      joined: '08 Sep 2026'
    },

    {
      id: 4,
      name: 'Vikas More',
      email: 'vikas@example.com',
      phone: '+91 9898989898',
      status: 'Active',
      joined: '05 Sep 2026'
    }
  ]);


  /* ==========================================
     ADMINS
  ========================================== */

  admins = signal<AdminUser[]>([
    {
      id: 1,
      username: 'admin',
      password: '12345678',
      role: 'Super Admin'
    }
  ]);


  showAdminModal = signal(false);

  adminForm = signal({
    username: '',
    password: '',
    role: 'Admin'
  });


  /* ==========================================
     HOME WALLPAPER
  ========================================== */

  wallpaper = signal(
    'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1800&q=90'
  );


  wallpaperInput = '';


  /* ==========================================
     PRODUCT SERVICE
  ========================================== */

  constructor(
    public productService: ProductService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (!this.isBrowser) {
      return;
    }

    const savedWallpaper =
      localStorage.getItem('khetal-home-wallpaper');

    if (savedWallpaper) {
      this.wallpaper.set(savedWallpaper);
    }


    const savedAdmins =
      localStorage.getItem('khetal-admins');

    if (savedAdmins) {

      try {

        this.admins.set(
          JSON.parse(savedAdmins)
        );

      } catch {

        console.log(
          'Could not load saved admins'
        );

      }

    }
  }


  /* ==========================================
     STATISTICS
  ========================================== */

  totalProducts = computed(() =>
    this.productService.products().length
  );


  availableProducts = computed(() =>
    this.productService
      .products()
      .filter(product => product.available)
      .length
  );


  featuredProducts = computed(() =>
    this.productService
      .products()
      .filter(product => product.featured)
      .length
  );


  totalUsers = computed(() =>
    this.users().length
  );


  totalAdmins = computed(() =>
    this.admins().length
  );


  /* ==========================================
     NAVIGATION
  ========================================== */

  changeSection(section: string): void {
    this.activeSection.set(section);
  }


  toggleSidebar(): void {
    this.sidebarOpen.update(
      value => !value
    );
  }


  updateProductField<K extends keyof Product>(
    field: K,
    value: Product[K]
  ): void {
    this.productForm.update(current => ({
      ...current,
      [field]: value
    }));
  }


  updateAdminField(
    field: 'username' | 'password' | 'role',
    value: string
  ): void {
    this.adminForm.update(current => ({
      ...current,
      [field]: value
    }));
  }


  /* ==========================================
     PRODUCT CRUD
  ========================================== */

  openAddProduct(): void {

    this.productMode.set('add');

    this.productForm.set({
      name: '',
      category: '',
      shortDescription: '',
      description: '',
      image: '',
      featured: false,
      available: true
    });

    this.showProductModal.set(true);
  }


  openEditProduct(product: Product): void {

    this.productMode.set('edit');

    this.selectedProduct.set(product);

    this.productForm.set({
      ...product
    });

    this.showProductModal.set(true);
  }


  closeProductModal(): void {

    this.showProductModal.set(false);

    this.selectedProduct.set(null);
  }


  saveProduct(): void {

    const form = this.productForm();


    if (
      !form.name ||
      !form.category ||
      !form.shortDescription ||
      !form.description
    ) {

      alert(
        'Please fill all required fields.'
      );

      return;
    }


    if (this.productMode() === 'add') {

      this.productService.addProduct({
        name: form.name!,
        category: form.category!,
        shortDescription:
          form.shortDescription!,

        description:
          form.description!,

        image:
          form.image ||
          'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=85',

        featured:
          form.featured ?? false,

        available:
          form.available ?? true
      });

    } else {

      const existing =
        this.selectedProduct();

      if (!existing) {
        return;
      }


      this.productService.updateProduct({
        ...existing,
        ...form,

        name: form.name!,
        category: form.category!,
        shortDescription:
          form.shortDescription!,

        description:
          form.description!
      });
    }


    this.closeProductModal();
  }


  deleteProduct(product: Product): void {

    const confirmed =
      confirm(
        `Delete "${product.name}"?`
      );

    if (!confirmed) {
      return;
    }

    this.productService.deleteProduct(
      product.id
    );
  }


  resetProducts(): void {

    const confirmed =
      confirm(
        'Reset all products to default data?'
      );

    if (!confirmed) {
      return;
    }

    this.productService.resetProducts();
  }


  /* ==========================================
     ADMIN MANAGEMENT
  ========================================== */

  openAdminModal(): void {

    this.adminForm.set({
      username: '',
      password: '',
      role: 'Admin'
    });

    this.showAdminModal.set(true);
  }


  closeAdminModal(): void {
    this.showAdminModal.set(false);
  }


  addAdmin(): void {

    if (!this.isBrowser) {
      return;
    }

    const form =
      this.adminForm();


    if (
      !form.username.trim() ||
      !form.password.trim()
    ) {

      alert(
        'Username and password are required.'
      );

      return;
    }


    const exists =
      this.admins().some(
        admin =>
          admin.username.toLowerCase() ===
          form.username.trim().toLowerCase()
      );


    if (exists) {

      alert(
        'This username already exists.'
      );

      return;
    }


    const newAdmin: AdminUser = {

      id: Date.now(),

      username:
        form.username.trim(),

      password:
        form.password,

      role:
        form.role
    };


    this.admins.update(
      admins => [
        ...admins,
        newAdmin
      ]
    );


    localStorage.setItem(
      'khetal-admins',
      JSON.stringify(
        this.admins()
      )
    );


    this.closeAdminModal();
  }


  deleteAdmin(id: number): void {

    if (!this.isBrowser) {
      return;
    }

    if (this.admins().length === 1) {

      alert(
        'At least one admin account must remain.'
      );

      return;
    }


    const confirmed =
      confirm(
        'Delete this admin account?'
      );


    if (!confirmed) {
      return;
    }


    this.admins.update(
      admins =>
        admins.filter(
          admin => admin.id !== id
        )
    );


    localStorage.setItem(
      'khetal-admins',
      JSON.stringify(
        this.admins()
      )
    );
  }


  /* ==========================================
     WALLPAPER
  ========================================== */

  updateWallpaper(): void {

    if (!this.isBrowser) {
      return;
    }

    const url =
      this.wallpaperInput.trim();


    if (!url) {

      alert(
        'Please enter a valid image URL.'
      );

      return;
    }


    this.wallpaper.set(url);

    localStorage.setItem(
      'khetal-home-wallpaper',
      url
    );


    this.wallpaperInput = '';

    alert(
      'Homepage wallpaper updated successfully.'
    );
  }


  resetWallpaper(): void {

    const defaultWallpaper =
      'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1800&q=90';


    this.wallpaper.set(
      defaultWallpaper
    );

    if (this.isBrowser) {
      localStorage.setItem(
        'khetal-home-wallpaper',
        defaultWallpaper
      );
    }
  }


  /* ==========================================
     LOGOUT
  ========================================== */

  logout(): void {

    if (!this.isBrowser) {
      return;
    }

    localStorage.removeItem(
      'adminLoggedIn'
    );

    window.location.href = '/login';
  }
}
