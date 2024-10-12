import {Component, EventEmitter, input, Input, output, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-card-sorteado',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './card-sorteado.component.html',
  styleUrl: './card-sorteado.component.scss'
})
export class CardSorteadoComponent {
  public equipesSorteadasInput = input<any>();
  public equipesSorteadasOutput = output<boolean>();

  voltar() {
    this.equipesSorteadasOutput.emit(false)
  }

  copiarTimes() {
    const times = this.equipesSorteadasInput();

    let textoParaCopiar = '';

    times.forEach((grupoDeOpcoes: any[], indexOpcao: number) => {
      textoParaCopiar += `*OPÇÃO ${indexOpcao + 1}*\n\n`;

      grupoDeOpcoes.forEach((opcao: any[], indexGrupo: number) => {
        textoParaCopiar += `Equipe ${indexGrupo + 1}:\n`;
        opcao.forEach((jogador: any, indexJogador: number) => {
          textoParaCopiar += `${indexJogador + 1}. ${jogador.name}\n`;
        });
        textoParaCopiar += '\n';
      });

      textoParaCopiar += '\n';
    });

    // Copiar o texto formatado para a área de transferência
    navigator.clipboard.writeText(textoParaCopiar).then(() => {
      alert('Times copiados para a área de transferência!');
    }).catch(err => {
      console.error('Erro ao copiar os times: ', err);
    });
  }

}
