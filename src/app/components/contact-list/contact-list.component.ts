import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [FormsModule, RouterModule, RouterLink],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  searchTerm: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  loadContacts() {
    this.contacts = this.contactService.getContacts();
  }

  deleteContact(id: number) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id);
      this.loadContacts(); // Refresh the list
    }
  }

  get filteredContacts(): Contact[] {
    return this.contacts.filter(
      (contact) =>
        contact.firstName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        contact.lastName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        contact.phone.includes(this.searchTerm)
    );
  }
}
