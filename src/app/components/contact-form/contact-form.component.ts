import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.contactForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-zА-Яа-яЁёІіЇїЄє']+$/),
          Validators.minLength(2),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-zА-Яа-яЁёІіЇїЄє']+$/),
          Validators.minLength(2),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern(/^\+380\d{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id && id !== 'new') {
      this.isEditMode = true;
      const contact = this.contactService.getContactById(Number(id));
      if (contact) {
        this.contactForm.patchValue(contact);
      }
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contact: Contact = this.contactForm.value;
      if (this.isEditMode) {
        contact.id = Number(this.route.snapshot.params['id']);
        this.contactService.updateContact(contact);
      } else {
        this.contactService.addContact(contact);
      }
      this.router.navigate(['/']);
    }
  }

  cancel() {
    this.location.back();
  }
}
