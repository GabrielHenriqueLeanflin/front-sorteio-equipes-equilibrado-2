import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private http = inject(HttpClient)

  getAll(id: any) {
    return this.http.get(`${environment.api}/api/jogadores?id=${id}`)
  }

  createJogador(group_id, name, level, position) {
    return this.http.post(`${environment.api}/api/criar-jogador`, {group_id, name,level, position})
  }

  updateJogador(group_id, name, level, position) {
    return this.http.put(`${environment.api}/api/atualizar-jogador`, {group_id, name,level, position})
  }

  atualizarStatus(idJogador) {
    return this.http.post(`${environment.api}/api/atualizar-status`, idJogador);
  }

  excluirJogador(group_id, name, level, position) {
    return this.http.delete(`${environment.api}/api/excluir-jogador`, {
      params: { group_id, name, level, position }
    });
  }
}
