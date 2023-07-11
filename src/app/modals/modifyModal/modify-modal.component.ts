import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http'
import { Player } from 'src/app/player';
import { PlayerService } from './../../player.service';


@Component({
  selector: 'app-modify-modal',
  templateUrl: './modify-modal.component.html',
  styleUrls: ['./modify-modal.component.css']
})
export class ModifyModalComponent implements OnInit{

  public player: Player;
  public namePlayer: string;
  public rankPlayer: number;

  constructor(private playerService: PlayerService, private matDialogRef: MatDialogRef<ModifyModalComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.player = data;
  }

  ngOnInit() {
    this.namePlayer = this.player.name;
    this.rankPlayer = this.player.classement;
  }

  onModify() {
    let modifPlayer: Player = {id: this.player.id, name: this.namePlayer, classement: this.rankPlayer};
    this.playerService.updatePlayer(modifPlayer).subscribe(
      (response: Player) => {
      //faire un test sur le retour
      console.log(response);
      this.matDialogRef.close(true);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  close() {
    this.matDialogRef.close();
  }


}
