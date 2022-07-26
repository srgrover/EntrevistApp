import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterData } from 'src/app/shared/models/RegisterData';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MyErrorStateMatcher } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  hide = true;
  hideRepeat = true;
  repeatPassFormControl = new FormControl('', [Validators.required]);
  errorPasswords: boolean = false;

  matcher = new MyErrorStateMatcher();

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  register(data: RegisterData) {
    this.errorPasswords = !this.checkPasswords();

    if (!this.errorPasswords)
      this.auth
        .register(data)
        .then(() => {
          this.openSnackBar('Cuenta creada correctamente', 'Ok', 'bg-success');
          this.router.navigate(['/login']);
        })
        .catch((e) => {
          console.error(e.message);
          this.openSnackBar(e.message, 'Ok', 'bg-danger');
        });
    else {
      this.openSnackBar('Las contraseñas no coinciden', 'Ok', 'bg-danger');
      this.registerForm.controls['pass'].reset();
      this.repeatPassFormControl.reset();
    }
  }

  checkPasswords() {
    return this.registerForm.value.password === this.repeatPassFormControl.value;
  }

  openSnackBar(message: string, action: string, type: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: [type],
    });
  }

  goLogin() {
    this.router.navigate(['/login']);
  }
}
