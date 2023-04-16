import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ConfiguratoreService } from '../../../service/configuratore.service';
import { MessageResponse } from '../../../dto/messageResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-response',
  templateUrl: './dialog-response.component.html',
  styleUrls: ['./dialog-response.component.scss']
})
export class DialogResponseComponent implements OnInit {

  message: MessageResponse;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialogResponseComponent>,
              public config:ConfiguratoreService ,
              private route: Router) { }

  ngOnInit(): void {
    if(this.data.message){
      this.message = this.data.message;
    }
  }

  goTo(){
    this.route.navigate([this.message.path]);
  }

}
