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
}
