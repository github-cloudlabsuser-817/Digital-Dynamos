import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isValidUser: boolean = false;
  isSubmitting = false;

    // Your locations data would go here
  favourites = [
    {
      name: 'Chempark Leverkusen',
      address: 'Friedrich-Ebert-Straße 162, 51373 Leverkusen, Germany',
      isFavourite: true
    },
    // ... other favourite locations
  ];

  allLocations = [
    {
      name: 'My Leverkusen',
      address: 'Carl-Duisberg-Straße, 51373 Leverkusen, Germany',
      isFavourite: false
    },
    // ... other locations
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  onSubmit() {
    this.nav.navigateForward('/dashboard');
    // this.isSubmitting = true;
    // if (this.loginForm.valid) {
    //   if(this.loginForm.controls['username'].value === environment.user.name && this.loginForm.controls['password'].value === environment.user.pass) {
    //     this.isValidUser = true;
    //     // Handle login logic here (e.g., API call, authentication)
    //     console.log('Form submitted:', this.loginForm.value);
    //     // You can add your login logic here, such as sending data to an API
    //     localStorage.setItem("isLoggedin", "true");
    //     this.router.navigate(['/dashboard']);
    //   } else {
    //     this.isValidUser = false;
    //   }
    // } else {
    //   // Form validation failed
    //   console.log('Form not valid');
    // }
  }
  textChange() {
    this.isSubmitting = false;
  }
}
