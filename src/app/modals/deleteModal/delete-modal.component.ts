import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http'
import { Player } from 'src/app/player';
import { PlayerService } from './../../player.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent{

  public player: Player;

  constructor(private playerService: PlayerService, private matDialogRef: MatDialogRef<DeleteModalComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.player = data;
  }

  onDelete() {
    this.playerService.deletePlayer(this.player.id).subscribe(
      (response: void) => {
      //faire un test sur le retour
      console.log(response);
      this.matDialogRef.close();
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
