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
}
