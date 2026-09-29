import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  governanceStandards = [
    {
      badge: 'GPP Compliant',
      title: 'Good Pharmacy Practice',
      description:
        'All dispensing workflows comply with national healthcare council guidelines and international Good Pharmacy Practice standards.',
    },
    {
      badge: 'Cold Chain',
      title: 'Temperature-Monitored Logistics',
      description:
        'Biologics, vaccines, and insulin products are transported in temperature-controlled packaging with active threshold monitoring.',
    },
    {
      badge: 'Anti-Counterfeit',
      title: 'Batch Serial Traceability',
      description:
        'Every unit matches verified manufacturer lot numbers, ensuring patients receive authentic formulations free from tampering.',
    },
    {
      badge: 'Patient Safety',
      title: 'Pharmacovigilance Reporting',
      description:
        'Direct reporting protocols for adverse reactions, drug interactions, and clinical recalls with registered health departments.',
    },
  ];

  milestones = [
    {
      year: '2022',
      title: 'Foundation & Clinical Licensing',
      description: 'Established central dispensing operations with full department of drug administration accreditation.',
    },
    {
      year: '2023',
      title: 'Cold-Chain Infrastructure',
      description: 'Implemented IoT temperature-monitored refrigerated transport for sensitive biologics and vaccines.',
    },
    {
      year: '2024',
      title: 'Digital Prescription Gateway',
      description: 'Connected 45+ partner clinics with instant prescription verification and batch trace logs.',
    },
    {
      year: '2025',
      title: 'Real-time Stock Automation',
      description: 'Launched integrated pharmacy management system for zero stock-out critical medications.',
    },
  ];
}
