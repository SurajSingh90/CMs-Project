import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SericesService } from 'src/app/serices.service';
// import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: SericesService,
    private toaster: ToastrService,
    private router: Router // private storage: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle the login logic
    }
  }

  loginform() {
    let value = this.loginForm.value;
    this.service.login(value).subscribe(
      (resp: any) => {
        if (resp) {
          // this.storage.store()
          console.log(resp.Token);

          localStorage.setItem('accessToken', resp.Token);

          this.toaster.success('login successfull');
          console.log(resp.id);
          let userTypesId = resp.id;
          this.router.navigate(['/auth/dashboard', userTypesId]);
        }
      },
      (error) => {
        console.log(error.error.message);

        this.toaster.error(error.error.message);
      }
    );
  }
}
