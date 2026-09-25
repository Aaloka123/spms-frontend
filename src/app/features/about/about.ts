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
}
