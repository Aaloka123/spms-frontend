import { Component } from '@angular/core';

export interface FaqItem {
  question: string;
  answer: string;
  icon: string;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  readonly faqs: FaqItem[] = [
    {
      question: 'How do I place an order?',
      answer:
        'Browse Products, add items to your cart, and complete checkout. Review everything before you confirm.',
      icon: 'package',
    },
    {
      question: 'Do I need a prescription for all medicines?',
      answer:
        'Prescription-only items require a valid prescription. Over-the-counter products can be ordered directly.',
      icon: 'clipboard',
    },
    {
      question: 'How long does delivery take?',
      answer:
        'Most orders arrive within 24–48 hours, depending on your location and product availability.',
      icon: 'truck',
    },
    {
      question: 'Can I return or cancel my order?',
      answer:
        'Cancel before dispatch. Returns are accepted for damaged or incorrect items per our policy.',
      icon: 'return',
    },
    {
      question: 'How can I track my order?',
      answer:
        'Use Order Tracking in the menu after checkout to follow your order from dispatch to delivery.',
      icon: 'search',
    },
    {
      question: 'Is online payment secure?',
      answer:
        'Yes. Payments use secure checkout and your card details are encrypted and never stored by us.',
      icon: 'card',
    },
  ];
}
