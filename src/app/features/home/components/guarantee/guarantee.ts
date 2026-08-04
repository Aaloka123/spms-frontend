import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Same shape as PublicVendorDto in the React app (simplified)
export interface PublicVendor {
  id: number;
  businessName: string;
  profileImage: string | null;
}

@Component({
  selector: 'app-guarantee',
  imports: [RouterLink],
  templateUrl: './guarantee.html',
  styleUrl: './guarantee.css',
})
export class Guarantee {
  // Mock data for now (replace with API later)
  vendors: PublicVendor[] = [
    { id: 1, businessName: 'Aaloka Pharmacy', profileImage: null },
    { id: 2, businessName: 'HealthPlus', profileImage: null },
    { id: 3, businessName: 'MediCare Hub', profileImage: null },
    { id: 4, businessName: 'City Drugs', profileImage: null },
    { id: 5, businessName: 'Wellness Mart', profileImage: null },
  ];

  loading = false;

  // Repeat logos so the marquee looks continuous (same idea as React)
  get marqueeItems(): PublicVendor[] {
    if (this.vendors.length === 0) return [];
    const repeatCount =
      this.vendors.length < 8
        ? Math.max(2, Math.ceil(16 / this.vendors.length))
        : 2;
    return Array.from({ length: repeatCount }, () => this.vendors).flat();
  }

  shopInitial(name: string): string {
    const trimmed = name.trim();
    return trimmed ? trimmed[0].toUpperCase() : '?';
  }
}
