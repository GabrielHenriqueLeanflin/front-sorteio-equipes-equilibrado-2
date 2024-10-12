import {Component, inject, OnInit} from '@angular/core';
import { CardSorteadoComponent } from "./card-sorteado/card-sorteado.component";
import { CommonModule } from '@angular/common';
import {AuthService} from "../../core/services/auth.service";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField} from "@angular/material/form-field";
import {
  MatAccordion, MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {PlayersService} from "../../core/services/players.service";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardSorteadoComponent, CommonModule, ReactiveFormsModule, MatError, MatAccordion, MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelDescription, MatIcon, MatFormField, MatExpansionModule, FormsModule, MatSelect, MatOption, MatRadioGroup, MatRadioButton],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  /** Injects */
  public authService = inject(AuthService);
  public playersService = inject(PlayersService)
  public formBuilder = inject(FormBuilder);
  public matSnackBar = inject(MatSnackBar);

  /** Variáveis */
  public id: any;
  public name: any;
  public userCache: any;
  public formSorteio: any;
  public formSorteioInvalid = false;
  public equipesSorteadas: any;
  public showCardSorteio: boolean = false;
  public showSaveStatus: any;
  public arrayJogadoresAtivos: any;
  public showAdicionarJogador: boolean;
  public formCriarJogador: any;
  public formCriarJogadorInvalid: boolean = false;
  public arrayQualidade: { [key: number]: string } = {
    1: 'Café com Leite',
    2: 'Mediano',
    3: 'Bom',
    4: 'Muito Bom',
    5: 'Craque',
  };

  async ngOnInit() {
    this.createForm();
    this.getIdUser();
    await this.loadJogadores();
  }

  createForm() {
    this.formSorteio = this.formBuilder.group({
      numero_opcoes: ['', [Validators.required]],
      numero_equipes: ['', [Validators.required]],
    })

    this.formCriarJogador = this.formBuilder.group({
      nome: ['', [Validators.required]],
      qualidade: ['', [Validators.required]],
      posicao: ['', [Validators.required]],
    })
  }

  getIdUser() {
    this.id = localStorage.getItem('id')
    this.name = localStorage.getItem("user")
  }

  sortear() {
    if (this.formSorteio.valid){
      let numeroOpcoes = this.formSorteio.get('numero_opcoes').value;
      let opcoes:any = []

      for (let i = 0; i < numeroOpcoes; i++) {
        opcoes.push(this.dividiEquipes());
      }

      this.equipesSorteadas = opcoes;
      this.showCardSorteio = true;

    } else {
      this.formSorteioInvalid = true;
    }
  }

  saveStatus(id, statusJogador) {
    console.log(id)
    console.log(statusJogador)
    this.playersService.atualizarStatus(id, statusJogador).subscribe({
      next: (res)=> {
        this.loadJogadores();
        this.matSnackBar.open('Status do Jogador atualizado com sucesso!', 'Ok', {
          duration: 5000,
          verticalPosition: 'top',
        });
      },
      error: (error)=> {
        console.error(error.error.message);
      }
    });
  }

  dividiEquipes() {
    // Quantidade de equipes
    let numero_equipes = this.formSorteio.get('numero_equipes').value;
    let groupTeam:any = [];

    for (let i = 0; i < numero_equipes; i++) {
      let team = []
      groupTeam.push(team)
    }

    // Jogadores Bons
    let playerBom = this.userCache.jogadores.filter((item) => item.level >= 9);
    playerBom.sort(() => Math.random() - 0.5);

    // Jogadores Medianos
    let playerMediado = this.userCache.jogadores.filter((item) => item.level <= 8);
    playerMediado.sort(() => Math.random() - 0.5);

    playerBom.forEach((jogador) => {
      if (jogador.status !== false) {
        const menorTeam = groupTeam.sort((a, b) => a.length - b.length)[0];
        menorTeam.push(jogador);
      }
    });

    playerMediado.forEach((jogador) => {
      if (jogador.status !== false) {
        const menorTeam = groupTeam.sort((a, b) => a.length - b.length)[0];
        menorTeam.push(jogador);
      }
    });

    return groupTeam;
  }

  async loadJogadores() {
    this.userCache = await this.getAllJogadores()
    this.arrayJogadoresAtivos = this.userCache.jogadores.filter(i => i.status === 1);
    console.log(this.arrayJogadoresAtivos)
  }

  getAllJogadores(): Promise<any> {
    return new Promise(resolve => this.playersService.getAll(this.id).subscribe(
      res => {
        resolve(res)
      }, error => {
        console.error(error)
      }
    ));
  }

  sair() {
    this.authService.logout();
  }

  emitShowCardSorteio($event: any) {
    this.showCardSorteio = $event;
  }

  addJogador() {
    this.showAdicionarJogador = true;
  }

  voltar() {
    this.showAdicionarJogador = false;
  }

  salvarJogador() {
    if (this.formCriarJogador.valid) {
      let nome = this.formCriarJogador.get('nome').value;
      let qualidade = this.formCriarJogador.get('qualidade').value;
      let posicao = this.formCriarJogador.get('posicao').value;
      console.log(nome, qualidade, posicao);

      this.playersService.createJogador(this.id, nome, qualidade, posicao).subscribe({
        next: (res) => {
          this.loadJogadores();

          this.formCriarJogador.get('nome').setValue('')
          this.formCriarJogador.get('qualidade').setValue('')
          this.formCriarJogador.get('posicao').setValue('')

          this.matSnackBar.open('Jogador cadastrado com sucesso!', 'Ok', {
            duration: 5000,
            verticalPosition: 'top',
          });
        },
        error: (error)=> {
          console.log(error)
        }
      });
      this.showAdicionarJogador = false;
    } else {
      this.formCriarJogadorInvalid = true;
    }
  }

  editJogador() {

  }

  removerJogador(idJogador) {
    console.log(idJogador)
    this.playersService.excluirJogador(idJogador).subscribe({
      next: (res) => {
        this.loadJogadores();
        this.matSnackBar.open('Jogador excluido com sucesso!', 'Ok', {
          duration: 5000,
          verticalPosition: 'top',
        });
        },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
