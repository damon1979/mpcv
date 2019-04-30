import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    loginForm: FormGroup;

    constructor(public fb: FormBuilder, public us: UserService, public router: Router) { }

    ngOnInit() {
	if (this.us.isAuth) {
	    this.us.logout();
	}
	this.initForm();
  }
    initForm() {
	this.loginForm = this.fb.group({
	    email: ['', [
		Validators.email,
		Validators.required
	    ]
		   ],
	    password: ['', [
		Validators.required,
		Validators.pattern(/[a-zA-Z0-9]{6,}/)
	    ]
		      ]
	});
    }
    onLogIn() {
	let email: string
	let pass: string;
	email = this.loginForm.value['email'];
	pass = this.loginForm.value['password'];
	console.log(email);
	console.log(pass);
	this.us.login(email, pass)
	    .then(() => {
		console.log("Cool!!!");
		this.router.navigate(['']);
	    })
	    .catch((e) => {
		console.log("C'est la merde.");
		console.log(e);
	    });
		  }
	
				       
}
