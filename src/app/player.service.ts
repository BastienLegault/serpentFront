import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { Player } from "./player";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiServerUrl}/player/all`);
  }

  public getPlayerById(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.apiServerUrl}/player/find/${id}`);
  }

  public addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(`${this.apiServerUrl}/player/add`, player);
  }

  public updatePlayer(player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiServerUrl}/player/update`, player);
  }

  public deletePlayer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/player/delete/${id}`);
  }

  public generatePoule(players: Player[], nbPoule: number): Observable<Array<Array<Player>>> {
    return this.http.post<Array<Array<Player>>>(`${this.apiServerUrl}/player/generate/${nbPoule}`, players);
  }
}