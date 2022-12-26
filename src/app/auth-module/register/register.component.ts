import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form: FormGroup = new FormGroup({
        loginId: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        role: new FormControl('')
    });
    submitted = false;
    sucessResponse: any;
    message: any;
    displapSuccessMsg: boolean = false;
    baseUrl: any;

    constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
        if (window.location.hostname === 'localhost') {
            this.baseUrl = window.location.protocol + '//' + window.location.hostname + ':3000';

        } else {
            this.baseUrl = window.location.origin + '/'

        }
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group(
            {
                loginId: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
                role: ['', Validators.required]
            }
        );
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        console.log(this.form.value);

        this.http.post(this.baseUrl + '/v1/users_register', {
            username: this.form.value.loginId,
            email: this.form.value.email,
            password: this.form.value.password,
            role: this.form.value.role
        },).subscribe({
            next: (res) => {
                console.log(res);
                this.sucessResponse = res;
                if (this.sucessResponse) {
                    this.onReset();
                    this.message = this.sucessResponse.message;
                    this.displapSuccessMsg = true;
                    setTimeout(() => {
                        this.displapSuccessMsg = false;
                        this.router.navigate(['']);
                    }, 1500)
                }
            }, error: (err) => {
                console.log(err);
                alert("Registration failed, please try again later")
            }
        })

    }

    onReset(): void {
        this.submitted = false;
        this.form.reset();
    }
}
