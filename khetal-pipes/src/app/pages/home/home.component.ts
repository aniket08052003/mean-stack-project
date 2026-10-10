import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        NavbarComponent,
        FooterComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    showPopup = true;

    constructor(
        public productService: ProductService,
        private router: Router
    ) {}

    ngOnInit(): void {

        setTimeout(() => {
            this.showPopup = false;
        }, 9000);

    }

    exploreProducts(): void {
        this.router.navigate(['/products']);
    }
}