import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexaoApiService } from '../services/conexao-api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-item',
  templateUrl: './editar-item.page.html',
  styleUrls: ['./editar-item.page.scss'],
})
export class EditarItemPage implements OnInit {

  id!: number;
  nomeProduto: string = '';
  quantidade: number = 0;
  preco: number = 0;

  constructor(
    private route: ActivatedRoute,
    private serv: ConexaoApiService,
    private router: Router,
    private toast : ToastController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']!;
      if (this.id) {
        this.carregarDadosProduto(this.id);
      }
    });
  }

  carregarDadosProduto(id: number) {
    this.serv.obterProdutoPorId(id).then(result => {
      if (result.ok) {
        const produto = result.produto;
        this.nomeProduto = produto.nome_produto;
        this.quantidade = produto.quant;
        this.preco = produto.valor;
      } else {
        console.error(result.message);
      }
    }).catch(error => {
      console.error('Erro ao carregar dados do produto: ', error);
    });
  }

  async atualizarProduto() {
    try {
      const result = await this.serv.atualizarProduto(this.id, this.nomeProduto, this.quantidade, this.preco);
      if (result.ok) {
        const toast = await this.toast.create({
          message: 'Produto atualizado com sucesso!',
          color: 'success',
          duration: 2500,
          position: 'bottom'
        });
        toast.present();
        // Redireciona para a página de listagem após o toast
        this.router.navigate(['/listar-itens']);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Erro ao atualizar o produto: ', error);
      const toast = await this.toast.create({
        message: 'Erro ao atualizar o produto!',
        color: 'danger',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    }
  }
}
