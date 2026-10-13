
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { NavbarComponent } from '../../pages/navbar/navbar.component';
import { FooterComponent } from '../../pages/footer/footer.component';

@Component({
  selector: 'app-infrastructure',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './infrastructure.component.html',
  styleUrl: './infrastructure.component.css'
})
export class InfrastructureComponent {

  currentImageIndex = 0;

  godownImages = [
    {
      src: 'assets/images/infrastructure-1.jpeg',
      alt: 'Khetal Pipes and Tubes godown',
      title: 'Our Godown Facility',
      description: 'Storage space for steel and iron products.'
    },
    {
      src: 'assets/images/infrastructure-2.jpeg',
      alt: 'Steel products in storage',
      title: 'Organised Storage',
      description: 'Organised storage for different material categories.'
    },
    {
      src: 'assets/images/infrastructure-3.jpeg',
      alt: 'Steel pipes and tubes',
      title: 'Steel Pipes and Tubes',
      description: 'Storage for pipes and tubes used in various projects.'
    },
    {
      src: 'assets/images/infrastructure-4.jpeg',
      alt: 'Steel materials arranged in the facility',
      title: 'Material Arrangement',
      description: 'Materials arranged for efficient handling.'
    },
    {
      src: 'assets/images/infrastructure-5.jpeg',
      alt: 'Iron and steel inventory',
      title: 'Steel and Iron Products',
      description: 'Materials for construction and industrial requirements.'
    },
    {
      src: 'assets/images/infrastructure-6.jpeg',
      alt: 'Godown material handling area',
      title: 'Material Handling',
      description: 'Space for handling and preparing customer orders.'
    },
    {
      src: 'assets/images/infrastructure-7.jpeg',
      alt: 'Steel stock ready for supply',
      title: 'Ready for Supply',
      description: 'Materials organised to support customer requirements.'
    },
    {
      src: 'assets/images/infrastructure-8.jpeg',
      alt: 'Khetal Pipes and Tubes storage facility',
      title: 'Our Infrastructure',
      description: 'Supporting reliable steel and iron product supplies.'
    },
    {
      src: 'assets/images/infrastructure-9.jpeg',
      alt: 'Khetal Pipes and Tubes storage facility',
      title: 'Our Infrastructure',
      description: 'Supporting reliable steel and iron product supplies.'
    }
  ];

  previousImage(): void {
    this.currentImageIndex =
      this.currentImageIndex === 0
        ? this.godownImages.length - 1
        : this.currentImageIndex - 1;
  }

  nextImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.godownImages.length;
  }

  goToImage(index: number): void {
    if (index >= 0 && index < this.godownImages.length) {
      this.currentImageIndex = index;
    }
  }
}
