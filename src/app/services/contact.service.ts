import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly STORAGE_KEY = 'contacts';

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      const sampleContacts: Contact[] = [
        {
          id: 1,
          firstName: 'Vitalik',
          lastName: 'Cholan',
          phone: '+380501234567',
          email: 'cholan.31@gmail.com',
          birthDate: new Date('2001-01-31'),
          address: 'Musical Street 220',
        },
      ];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sampleContacts));
    }
  }

  getContacts(): Contact[] {
    try {
      const contacts = localStorage.getItem(this.STORAGE_KEY);
      return contacts ? JSON.parse(contacts) : [];
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  }

  getContactById(id: number): Contact | undefined {
    const contacts = this.getContacts();
    return contacts.find((contact) => contact.id === id);
  }

  addContact(contact: Contact): void {
    const contacts = this.getContacts();
    contact.id = this.generateId();
    contacts.push(contact);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contacts));
  }

  updateContact(contact: Contact): void {
    const contacts = this.getContacts();
    const index = contacts.findIndex((c) => c.id === contact.id);
    if (index !== -1) {
      contacts[index] = contact;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contacts));
    }
  }

  deleteContact(id: number): void {
    const contacts = this.getContacts();
    const filteredContacts = contacts.filter((contact) => contact.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredContacts));
  }

  private generateId(): number {
    return Date.now();
  }
}
