
import { filmeslistaService } from './../../services/filmes_lista.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { filmes } from 'src/app/models/filmes_lista';

export interface generos {
  genero: string;
}

const generos: generos[] = [
  {genero: 'terror'},
  {genero: 'Acao'},
  {genero: 'Suspense'},
  {genero: 'Investigacao'},
  {genero: 'Romance'},
  {genero: 'Anime'},
  {genero: 'Aventura'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [filmeslistaService]
})

export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['posicao','titulo', 'DataLancamento', 'Genero', 'Diretor', 'Atores', 'actions'];
  dataSource!: filmes[];

  constructor(
    public dialog: MatDialog,
    public filmeslistaService: filmeslistaService
    ) {
      this.filmeslistaService.GetFilme()
        .subscribe((data: filmes[]) => {
          console.log(data);
          this.dataSource = data;
        })

  }

  ngOnInit(): void {
  }

  openDialog(element: filmes | null): void{
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        posicao: null,
        titulo: '',
        DataLancamento: null,
        Genero: '',
        Diretor: '',
        Atores: ''
      } : {
        id: element.id,
        posicao: element.posicao,
        titulo: element.titulo,
        DataLancamento: element.DataLancamento,
        Genero: element.Genero,
        Diretor: element.Diretor,
        Atores: element.Atores
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(this.dataSource.map(p => p.id).includes(result.id)){
          this.filmeslistaService.EditFilme(result)
            .subscribe((data: filmes) => {
              const index = this.dataSource.findIndex(p => p.id === data.id);
              this.dataSource[index] = data;
              this.table.renderRows();
            })
        } else{
          this.filmeslistaService.CreateFilme(result)
            .subscribe((data: filmes) => {
              this.dataSource.push(data);
              this.table.renderRows();
            })
        }
      }
    });
  }

  editMovie(element: filmes): void{
    this.openDialog(element);
  }

  deleteMovie(posicao: number): void{
    this.filmeslistaService.DeleteFilme(posicao)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.id !== posicao);
      })
  }
  }

