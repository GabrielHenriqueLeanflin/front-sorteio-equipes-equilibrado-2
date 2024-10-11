import {Component, inject, OnInit, output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
  /** INJECTS */
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  /** OUTPUT */
  public showCardCadastro = output<any>();

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
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.authService.createUser(this.cadastroForm.value).subscribe({
      next: (res) => {
        this.showCardCadastro.emit(false);
      }, error: (error) => {
        console.error(error.error.message);
      }
    });
  }

  voltar(event: boolean) {
    this.showCardCadastro.emit(event)
  }
}
