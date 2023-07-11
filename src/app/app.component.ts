import { Component, OnInit } from '@angular/core';
import { Player } from './player';
import { PlayerService } from './player.service';
import { HttpErrorResponse } from '@angular/common/http'
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from './modals/deleteModal/delete-modal.component';
import { ModifyModalComponent } from './modals/modifyModal/modify-modal.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public players: Array<Player> = [];
  result: Array<Array<Player>> = [];
  namePlayer: string = "";
  rankPlayer: number = 500;
  aGenere: boolean = false;
  numberPoule: number = 0;

  constructor(private playerService: PlayerService, private dialogRef: MatDialog) {}

  ngOnInit() {
    this.getPlayers();
  }


  public getPlayers(): void {
    this.playerService.getPlayers().subscribe(
      (response: Player[]) => {
        this.players = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddPLayer(addForm: NgForm) {
    console.log(addForm.value);
  }

  public addPlayer() {
    let newPlayer: Player = {id: null, name: this.namePlayer, classement: this.rankPlayer};
    this.playerService.addPlayer(newPlayer).subscribe(
      (response: Player) => {
        console.log(response);
        this.getPlayers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public generate(trie: boolean) {
    let joueurs: Array<Player> = [];
    Object.assign(joueurs, this.players);
    if (trie) {
      joueurs = joueurs.sort((a,b) => a.classement > b.classement ? -1 : 1);
    }
    this.playerService.generatePoule(joueurs, this.numberPoule).subscribe(v => {
      this.result = v;
      this.aGenere = true
    });
  }

  public modifyPlayer(player: Player) {
    this.dialogRef.open(ModifyModalComponent, {data : player})
    .afterClosed()
    .subscribe(() => {
      this.getPlayers();
    });
  }
  
  public deletePlayer(player: Player) {
    this.dialogRef.open(DeleteModalComponent, {data : player})
    .afterClosed()
    .subscribe(() => {
      this.getPlayers();
    });
  }
}
