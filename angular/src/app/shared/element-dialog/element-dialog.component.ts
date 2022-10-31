import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { filmes } from 'src/app/models/filmes_lista';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {
  movie!: filmes;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: filmes,
    public dialogRef: MatDialogRef<ElementDialogComponent>,

  ) {}


  ngOnInit(): void {
    if(this.data.posicao != null){
      this.isChange = true;
    } else{
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
