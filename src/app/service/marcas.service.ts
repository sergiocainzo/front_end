import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marca } from '../model/Marca';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MarcasService {
  private readonly API_LISTAGEM = 'http://localhost:8080/listagem';
  private readonly API_CADASTRO = 'http://localhost:8080/cadastrar';
  private readonly API_ALTERAR = 'http://localhost:8080/alterar';
  private readonly API_REMOVER = 'http://localhost:8080/remover';

  constructor(private http: HttpClient) {}

  selecionar(): Observable<Marca[]> {
    return this.http
      .get<Marca[]>(this.API_LISTAGEM)
      .pipe(catchError(this.handleError));
  }

  cadastrar(obj: Marca): Observable<Marca> {
    return this.http
      .post<Marca>(this.API_CADASTRO, obj)
      .pipe(catchError(this.handleError));
  }

  editar(obj: Marca): Observable<Marca> {
    return this.http
      .put<Marca>(this.API_ALTERAR, obj)
      .pipe(catchError(this.handleError));
  }

  remover(codigo: number): Observable<void> {
    return this.http
      .delete<void>(`${this.API_REMOVER}/${codigo}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      // Erro no lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro no lado do servidor
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
