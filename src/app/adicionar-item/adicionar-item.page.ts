import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexaoApiService } from '../services/conexao-api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-adicionar-item',
  templateUrl: './adicionar-item.page.html',
  styleUrls: ['./adicionar-item.page.scss'],
})
export class AdicionarItemPage implements OnInit {

  constructor(private rota : Router, private serv : ConexaoApiService, private toast : ToastController) { }

  ngOnInit() {
  }

  produto : string = '';
  quantidade : number | null = null;
  preco : number | null = null;

  async cadastrarProduto() {
    if (!this.produto.trim()  || this.quantidade == null || this.preco == null) {
      const toast = await this.toast.create({
        message: 'Pro favor, preencha todos os campos!',
        color: 'warning',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      return;
    }

    this.serv.cadastrarProduto(this.produto, this.quantidade, this.preco)
      .then(async (result) => {
        if(result.ok) {
          const toast = await this.toast.create({
            message: 'Produto cadastrado com sucesso!',
            color: 'success',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
          this.voltarListarItens();
          this.limparCampos();
        } else {
          const toast = await this.toast.create({
            message: result.message || 'Erro ao cadastrar o produto!',
            color: 'danger',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
        }
      })
      .catch(async (error) => {
        console.error('Erro ao cadastrar produto, tente novamente!', error);

        const toast = await this.toast.create({
          message: 'Ocorreu um erro ao cadastrar o produto!',
          color: 'danger',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
      })
  }

  voltarListarItens() {
    this.rota.navigate(['/listar-itens']);
  }

  limparCampos() {
    this.produto = '';
    this.quantidade = null;
    this.preco = null;
  }
}
