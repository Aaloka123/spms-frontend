import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  imports: [FormsModule],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts {
  formData = {
    name: '',
    email: '',
    phone: '',
    subject: 'prescription-inquiry',
    message: '',
  };

  messageSent = false;

  onSubmit(): void {
    if (this.formData.name && this.formData.email && this.formData.message) {
      this.messageSent = true;
    }
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      subject: 'prescription-inquiry',
      message: '',
    };
    this.messageSent = false;
  }

  openFaqIndex: number | null = 0;

  faqs = [
    {
      question: 'How do I submit or verify a digital prescription?',
      answer:
        'You can submit your prescription using the inquiry form above with the prescription details, or contact our pharmacist desk directly. Our licensed team cross-verifies all prescriptions with registered clinics before dispatch.',
    },
    {
      question: 'What are the delivery and fulfillment timelines?',
      answer:
        'Orders placed before 4:00 PM within central service areas are eligible for same-day delivery. Standard shipping takes 24 to 48 hours with cold-chain protection for temperature-sensitive drugs.',
    },
    {
      question: 'How do you guarantee medicine authenticity and batch safety?',
      answer:
        'MedNexus works exclusively with licensed pharmaceutical manufacturers and authorized distributors. Every batch is cataloged with its regulatory registration number and verified expiry date in real time.',
    },
    {
      question: 'Can I request emergency assistance or specialized formulations?',
      answer:
        'Yes. Our 24/7 emergency hotline is available for urgent medicine requirements. Our pharmacists coordinate directly with partner health institutions to source specialized medications.',
    },
  ];

  toggleFaq(index: number): void {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }
}
