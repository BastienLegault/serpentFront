import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { PlayerService } from './player.service';
import { HttpClientModule } from '@angular/common/http';
import { DeleteModalComponent } from './modals/deleteModal/delete-modal.component';
import { ModifyModalComponent } from './modals/modifyModal/modify-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteModalComponent,
    ModifyModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
