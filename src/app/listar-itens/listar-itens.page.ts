import { Component, OnInit } from '@angular/core';
import { ConexaoApiService } from '../services/conexao-api.service';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-listar-itens',
  templateUrl: './listar-itens.page.html',
  styleUrls: ['./listar-itens.page.scss'],
})
export class ListarItensPage implements OnInit {

  itens : any[] = [];
  selectedSegment : string = 'nao-adquiridos'; 

  constructor(private serv : ConexaoApiService, private rota : Router, private toast : ToastController, private alert : AlertController) { }

  ngOnInit() {
    this.carregarItens();
  }

  ionViewWillEnter() {
    this.carregarItens();
  }

  carregarItens() {
    this.serv.listarItens()
    .then(result => {
      if (result.ok) {
        //separar itens adquiridos de nao-adquiridos
        this.itens = result.result;
      } else {
        console.error('Erro ao listar os itens: ', result.message);
      }
    })
    .catch(error => {
      console.error('Erro ao carregar os itens: ', error);
    })
  }

  paginaAdicionarItem() {
    this.rota.navigate(['/adicionar-item']);
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,  // Duração do toast em milissegundos
      color: color,
      position: 'bottom'  // Pode ser 'top', 'middle', ou 'bottom'
    });
    toast.present();
  }

  async alertExcluirProduto(item : any){
    const alert = await this.alert.create({
      header: 'Excluir Produto!',
      message: `Deseja realmente excluir o produto "${item.nome}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentToast("Exclusão Cancelada!")
          }
        }, {
          text: 'Excluir',
          handler: async () => {
            await this.excluirProduto(item);
          }
        }
      ]
    });
    await alert.present();
  }

  async excluirProduto(item: any) {
    try {
      const result = await this.serv.excluirProduto(item.id);
      if (result.ok) {
        this.itens = this.itens.filter(i => i.id !== item.id);
        this.presentToast("Produto excluído com sucesso!");
      } else {
        this.presentToast("Erro ao excluir produto: " + result.message, 'danger');
      }
    } catch (error) {
      this.presentToast("Erro na requisição: " + error, 'danger');
    }
  }
}
