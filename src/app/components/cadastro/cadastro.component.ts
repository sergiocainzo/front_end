import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Marca } from '../../model/Marca';
import { MarcasService } from '../../service/marcas.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  marca = new Marca();
  marcas: Marca[] = [];
  btnCadastro: boolean = true;
  tabela: boolean = true;

  constructor(private servico: MarcasService) {}

  limparFormulario() {
    this.marca = new Marca();
  }

  selecionar(): void {
    this.servico.selecionar().subscribe(
      (retorno) => (this.marcas = retorno),
      (erro) => console.error('Erro ao buscar marcas', erro)
    );
  }

  cadastrar(): void {
    this.servico.cadastrar(this.marca).subscribe(
      (retorno) => {
        // Cadastrando cliente no Vetor
        this.marcas.push(retorno);
        this.limparFormulario();
        alert('Marca cadastrada com sucesso!!');
      },
      (erro) => {
        console.error('Erro ao cadastrar marca', erro);
        alert('Erro ao cadastrar a marca!');
      }
    );
  }

  selecionarMarca(posicao: number): void {
    this.marca = this.marcas[posicao];
    this.btnCadastro = false;
    this.tabela = false;
  }

  editar(): void {
    this.servico.editar(this.marca).subscribe(
      (retorno) => {
        let posicao = this.marcas.findIndex(
          (obj) => obj.codigo === retorno.codigo
        );
        this.marcas[posicao] = retorno;
        this.limparFormulario();
        this.btnCadastro = true;
        this.tabela = true;
        alert('Marca alterada com sucesso!');
      },
      (erro) => {
        console.error('Erro ao editar marca', erro);
        alert('Erro ao editar a marca!');
      }
    );
  }

  remover(): void {
    this.servico.remover(this.marca.codigo).subscribe(
      () => {
        let posicao = this.marcas.findIndex(
          (obj) => obj.codigo === this.marca.codigo
        );
        this.marcas.splice(posicao, 1);
        this.limparFormulario();
        this.btnCadastro = true;
        this.tabela = true;
        alert('Marca removida com sucesso!');
      },
      (erro) => {
        console.error('Erro ao remover marca', erro);
        alert('Erro ao remover a marca!');
      }
    );
  }

  cancelar(): void {
    this.limparFormulario();
    this.btnCadastro = true;
    this.tabela = true;
  }

  ngOnInit() {
    this.selecionar();
  }
}
