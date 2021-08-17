import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  onRegister() {
    console.log('Form->', this.registerForm.value)
  }

}
