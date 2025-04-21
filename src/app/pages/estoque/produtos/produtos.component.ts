import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProdutoService } from '../../../service/produtoService/produto.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../../service/categoriaService/categoria.service';
import { AppComponent } from '../../../app.component';
import { NgxMaskDirective } from 'ngx-mask';


@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxMaskDirective

  ],
  providers:[
    ProdutoService

  ],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  isSidebarOpen: boolean = true;
  produtoForm!: FormGroup;
  produtos: any[] = [];
  subcategorias: any[] = [];

  mostrarTabela: boolean = false;

  	novoProduto = {
      name: '',
      price: '',
      amount: '',
      describe: '',
      subcategoryId: ''
    };


    constructor(
      private fb: FormBuilder,
      private produtoService: ProdutoService,
      private categoriaService: CategoriaService,
      private toastService: ToastrService
    ){

    }

    ngOnInit(): void {
      this.produtoForm = this.fb.group({
        name: ['', Validators.required],
        price: [null, [Validators.required, Validators.min(0)]],
        amount:[null, [Validators.required, Validators.min(1)]],
        describe: [''],
        subcategoryId: ['', Validators.required]
      });

      this.categoriaService.listarSubCategorias().subscribe(data => {
        this.subcategorias = data;
      });
    }

    cadastrarProduto(): void {
      if (this.produtoForm.invalid) {
        this.toastService.error("Preencha os Campos Obrigatórios");
        return;
      }

      const formValue = this.produtoForm.value;

      // Remover "R$" e outros caracteres não numéricos (como pontos e vírgulas)
      const priceString = String(formValue.price)
        .replace('R$', '')         // Remove o prefixo "R$"
        .replace(/\./g, '')        // Remove os pontos (separadores de milhar)
        .replace(',', '.');        // Substitui vírgula por ponto (separador decimal)

      // Tentar converter para número de precisão dupla (float)
      const parsedPrice = parseFloat(priceString);

      // Verificar se a conversão resultou em um número válido
      if (isNaN(parsedPrice)) {
        this.toastService.error("Preço inválido");
        return;
      }

      // Definir o preço convertido no objeto final
      formValue.price = parsedPrice;

      // Enviar o produto com o preço convertido
      this.produtoService.cadastrarProduto(formValue).subscribe({
        next: () => {
          this.toastService.success("Produto Criado Com Sucesso!");
          this.produtoForm.reset();
        },
        error: (err) => {
          // Logar o erro completo para diagnóstico
          console.error("Erro ao cadastrar o produto: ", err);

          // Verificar o tipo de erro (exemplo: erro do servidor ou dados inválidos)
          if (err.status === 400) {
            this.toastService.error("Erro de validação no servidor. Verifique os dados.");
          } else if (err.status === 500) {
            this.toastService.error("Erro no servidor. Tente novamente mais tarde.");
          } else {
            this.toastService.error("Erro ao Cadastrar o Produto");
          }
        }
      });
    }




    toggleSidebar(): void {
      this.isSidebarOpen = !this.isSidebarOpen;
    }

    
}
