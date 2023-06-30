import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SericesService } from 'src/app/serices.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isLoggedIn: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: SericesService,
    private toaster: ToastrService,
    private router: Router
  ) {}
  ngOnInit() {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['', Validators.required],
    });
  }
  registerUsers() {
    let value = this.form.value;
    this.service.registers(value).subscribe(
      (resp: any) => {
        this.toaster.success('Register Sccessfull');
        this.router.navigate(['/auth/login']);
        console.log(resp);
      },
      (error) => {
        console.log(error.error.message);
        this.toaster.error(error.error.message);
      }
    );
  }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
  loginRoute(event: Event) {
    event.preventDefault();
    this.router.navigate(['/auth/login']);
  }
}
