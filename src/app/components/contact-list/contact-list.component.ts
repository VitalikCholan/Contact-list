import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [FormsModule, RouterModule],
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
