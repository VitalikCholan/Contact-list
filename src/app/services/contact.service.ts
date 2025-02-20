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
        {
          id: 2,
          firstName: 'Misha',
          lastName: 'Korotkiy',
          phone: '+380507654321',
          email: 'misha.korotkiy@gmail.com',
          birthDate: new Date('2001-05-15'),
          address: 'Main Street 123',
        },
        {
          id: 3,
          firstName: 'Anna',
          lastName: 'Panna',
          phone: '+380509876543',
          email: 'anna.panna@gmail.com',
          birthDate: new Date('1995-08-20'),
          address: 'Parkova 456',
        },
        {
          id: 4,
          firstName: 'Maria',
          lastName: 'Kovalenko',
          phone: '+380506789012',
          email: 'maria.kovalenko@gmail.com',
          birthDate: new Date('1992-03-25'),
          address: 'Kovalenko Street 321',
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
