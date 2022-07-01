import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {
  name:string = '';

  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>,) { }

  @HostListener('window:keyup.Enter', ['$event'])
  onDialogClick(event: KeyboardEvent): void {
    this.close(this.name);
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close(inputText:string): void {
    this.dialogRef.close(inputText);
  }
}
