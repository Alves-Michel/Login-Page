import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProdutoService } from '../../../service/produtoService/produto.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
@Component({
  selector: 'app-buscar-produtos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],providers:[
    ProdutoService
  ],
  templateUrl: './buscar-produtos.component.html',
  styleUrl: './buscar-produtos.component.scss'
})
export class BuscarProdutosComponent {
    termoBuscar: string = '';
    produtos: any [] = [];
    private buscaSubject = new Subject<string>();

    constructor(
      private produtoService: ProdutoService
    ){}

    ngOnInit(){
        this.buscaSubject.pipe(
          debounceTime(400),
          distinctUntilChanged()
        ).subscribe((valor)=> {
          if(valor.trim().length > 0){
            this.buscar(valor);
          }else{
            this.produtos = [];
          }
        })
    }

    onInputChange(event: any) {
      this.buscaSubject.next(this.termoBuscar);
    }


    buscar(valor: string) {
      this.produtoService.buscar(valor).subscribe({
        next: (produtos) => {
          this.produtos = produtos;
        },
        error: (err) => {
          console.error('Erro ao buscar produtos:', err);
        }
      });
    }

}
