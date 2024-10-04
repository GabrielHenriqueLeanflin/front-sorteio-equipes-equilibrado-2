import {Component, inject, OnInit, output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  /** INJECTS */
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  /** OUTPUT */
  public showCardCadastro = output<boolean>();

  /** FORM */
  public cadastroForm: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.cadastroForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.authService.createUser(this.cadastroForm.value).subscribe(
      (res: any) => {
        this.showCardCadastro.emit(false);
      },
      (error: any) => {
        console.error(error.error.message);
      }
    );
  }

  voltar() {
    this.showCardCadastro.emit(false)
  }
}
