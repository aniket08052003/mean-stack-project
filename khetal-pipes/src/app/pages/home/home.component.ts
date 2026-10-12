import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';

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

    isSending = false;
    successMessage = '';
    errorMessage = '';

    async sendEnquiry(event: Event): Promise<void> {
        event.preventDefault();

        const form = event.currentTarget as HTMLFormElement;

        if (!form.reportValidity() || this.isSending) {
            return;
        }

        this.isSending = true;
        this.successMessage = '';
        this.errorMessage = '';

        try {
            await emailjs.sendForm(
                'service_j2vf06g',
                'template_0jc3pbr',
                form,
                {
                    publicKey: '1XHPPmhjK61z3wcTM'
                }
            );

            this.successMessage = 'Your enquiry has been sent successfully!';
            form.reset();
        } catch (error) {
            console.error('Email sending failed:', error);
            this.errorMessage = 'Unable to send your enquiry. Please try again later.';
        } finally {
            this.isSending = false;
        }
    }

}