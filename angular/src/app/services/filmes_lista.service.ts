import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filmes } from '../models/filmes_lista';

@Injectable()
export class filmeslistaService {
  filmesApiUrl = 'https://localhost:44366/swagger/index.html';
  constructor(private http: HttpClient) { }

  GetFilme(): Observable<filmes[]> {
    return this.http.get<filmes[]>(this.filmesApiUrl);
  }

  CreateFilme(element: filmes): Observable<filmes>{
    return this.http.post<filmes>(this.filmesApiUrl, element);
  }

  EditFilme(element: filmes): Observable<filmes>{
    return this.http.put<filmes>(this.filmesApiUrl, element);
  }

  DeleteFilme(id: number): Observable<any>{
    return this.http.delete<any>(`${this.filmesApiUrl}?id=${id}`);
  }

}

