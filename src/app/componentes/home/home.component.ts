import {Component} from "@angular/core";
import {CadastroComponent} from "../auth/cadastro/cadastro.component";
import {LoginComponent} from "../auth/login/login.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CadastroComponent,
    LoginComponent,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  public showCadastro = false;

  showCardCadastro(event: boolean) {
    console.log(event)
    this.showCadastro = event;
  }
}
