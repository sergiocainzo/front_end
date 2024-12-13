import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}


  crud:string="CRUD - é um acrônico que representa as quatro operações básicas que podem ser realizadas em um Banco de Dados ou Sistema de Gerenciamento de Dados:\n\nCreate(criar) - Operação que cria novos registros.\nRead(Ler) - Operação que lê ou recupera dados.\nUpdate(atualizar) - Operação que modifica dados existentes.\nDelete(deletar) - Operação que remove registros existentes de uma tabela."


  definicaoCrud(){
    alert(`${this.crud}`)
  }

  navegateCadastro() {
    this.router.navigate(['cadastro']);
  }
}
