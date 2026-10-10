import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

interface ProductItem {
  icon: string;
  name: string;
  description: string;
}

interface StrengthItem {
  icon: string;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  position: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  products: ProductItem[] = [
    {
      icon: '◯',
      name: 'MS Pipes',
      description:
        'Mild steel pipes for structural, industrial and fabrication requirements.'
    },
    {
      icon: '◉',
      name: 'Galvanised Pipes',
      description:
        'GI pipes suitable for applications requiring corrosion resistance.'
    },
    {
      icon: '◎',
      name: 'Seamless Pipes',
      description:
        'Seamless piping products for demanding industrial applications.'
    },
    {
      icon: '∟',
      name: 'MS Angles',
      description:
        'Structural steel angles for construction, fabrication and support frames.'
    },
    {
      icon: '━',
      name: 'MS Bars and Flats',
      description:
        'Steel bars and flats available for varied engineering requirements.'
    },
    {
      icon: '▱',
      name: 'MS Plates',
      description:
        'Steel plates suited to fabrication, construction and industrial work.'
    },
    {
      icon: '★',
      name: 'Roofing Sheets',
      description:
        'Roofing materials for commercial, industrial and development projects.'
    },
    {
      icon: '✦',
      name: 'Related Hardware',
      description:
        'Related steel and hardware products available under one roof.'
    }
  ];

  strengths: StrengthItem[] = [
    {
      icon: '25+',
      title: 'Years of experience',
      description:
        'More than 25 years of experience in the steel and iron industry.'
    },
    {
      icon: '✓',
      title: 'Quality products',
      description:
        'A commitment to maintaining dependable and quality-focused stock.'
    },
    {
      icon: '₹',
      title: 'Competitive rates',
      description:
        'Product options offered with an emphasis on competitive pricing.'
    },
    {
      icon: '⚡',
      title: 'Timely delivery',
      description:
        'Efficient service focused on fulfilling customer requirements on time.'
    },
    {
      icon: '⌂',
      title: 'One-stop destination',
      description:
        'A comprehensive range of steel, pipes, roofing and hardware products.'
    },
    {
      icon: '◇',
      title: 'Stockist of odd sizes',
      description:
        'Support for specifications that may not be readily available elsewhere.'
    }
  ];

  teamMembers: TeamMember[] = [
    {
      name: 'Shri Zumbarlal Hansraj ji Gandhi',
      position: 'Founder',
      description:
        'Founder of Khetal Pipes & Tubes, with a business foundation built on product quality, competitive pricing, timely delivery and dependable service.',
      image: 'https://unsplash.com'
    },
    {
      name: 'Sales and Customer Support',
      position: 'Customer Service Team',
      description:
        'Supports customers in understanding available products, specifications and suitable material options.',
      image: 'https://unsplash.com'
    },
    {
      name: 'Operations and Dispatch',
      position: 'Fulfilment Team',
      description:
        'Coordinates stock handling, order preparation and timely product delivery.',
      image: 'https://unsplash.com'
    }
  ];

  scrollToProducts(): void {
    const productSection = document.getElementById(
      'product-range'
    );

    productSection?.scrollIntoView({
      behavior: 'smooth'
    });
  }
}
