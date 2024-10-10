import {Component, inject, OnInit, output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  /** INJECTS */
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private matSnackBar = inject(MatSnackBar);

  /** OUTPUT */
  public showCardCadastro = output<boolean>();

  /** FORM */
  public loginForm: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit(event: Event){
    event.preventDefault();
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', res.name)
        localStorage.setItem('id', res.id)
        this.router.navigate(['/dashboard']);
        this.matSnackBar.open(res.message, 'Ok', {
          duration: 5000,
          verticalPosition: 'top',
        });
      }, error: (error) => {
        this.matSnackBar.open('Dados inválidos!', 'Ok', {
          duration: 5000,
          verticalPosition: 'top',
        });
      }
    })
  }

  clickCadastro(event: boolean) {
    this.showCardCadastro.emit(event)
  }
}
