import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface FaqItem {
  question: string;
  answer: string;
  icon: string;
  category: 'Ordering' | 'Prescriptions' | 'Delivery' | 'Billing';
}

@Component({
  selector: 'app-faq',
  imports: [FormsModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  readonly categories = ['All', 'Ordering', 'Prescriptions', 'Delivery', 'Billing'] as const;
  activeCategory: string = 'All';
  searchQuery = '';

  readonly faqs: FaqItem[] = [
    {
      question: 'How do I place an order?',
      answer:
        'Browse Products, add items to your cart, and complete checkout. Review everything before you confirm.',
      icon: 'package',
      category: 'Ordering',
    },
    {
      question: 'Do I need a prescription for all medicines?',
      answer:
        'Prescription-only items require a valid prescription. Over-the-counter products can be ordered directly.',
      icon: 'clipboard',
      category: 'Prescriptions',
    },
    {
      question: 'How long does delivery take?',
      answer:
        'Most orders arrive within 24–48 hours, depending on your location and product availability.',
      icon: 'truck',
      category: 'Delivery',
    },
    {
      question: 'Can I return or cancel my order?',
      answer:
        'Cancel before dispatch. Returns are accepted for damaged or incorrect items per our policy.',
      icon: 'return',
      category: 'Ordering',
    },
    {
      question: 'How can I track my order?',
      answer:
        'Use Order Tracking in the menu after checkout to follow your order from dispatch to delivery.',
      icon: 'search',
      category: 'Delivery',
    },
    {
      question: 'Is online payment secure?',
      answer:
        'Yes. Payments use secure checkout and your card details are encrypted and never stored by us.',
      icon: 'card',
      category: 'Billing',
    },
  ];

  get filteredFaqs(): FaqItem[] {
    const q = this.searchQuery.trim().toLowerCase();
    return this.faqs.filter((faq) => {
      const matchCat = this.activeCategory === 'All' || faq.category === this.activeCategory;
      const matchQuery =
        !q || faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }

  setCategory(cat: string): void {
    this.activeCategory = cat;
  }
}
