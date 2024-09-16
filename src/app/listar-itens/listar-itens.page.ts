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
  totalValor: number = 0;
  totalValorAdquiridos : number = 0;
  itensAdquiridos : any[] = [];

  constructor(private serv : ConexaoApiService, private rota : Router, private toast : ToastController, private alert : AlertController) { }

  ngOnInit() {
    this.carregarItens();
  }

  ionViewWillEnter() {
    this.carregarItens();
  }

  onCheckboxChange(event: any, item: any) {
    // Verifica se o checkbox foi marcado
    if (event.detail.checked) {
      // Move o item para adquiridos
      this.moverParaAdquiridos(item);
    } else {
      this.restituirItem(item);
    }
  }
  /*moverParaAdquiridos(item: any) {
    // Remove o item da lista de não adquiridos
    this.itens = this.itens.filter(i => i !== item);

    // Adiciona o item à lista de adquiridos
    this.itensAdquiridos.push(item);
    this.calcularTotal();
    this.calcularTotalAdquiridos();
  }*/
 async moverParaAdquiridos(item: any) {
    try {
      const result = await this.serv.marcarComoAdquirido(item.id);
      if (result.ok) {
        this.itens = this.itens.filter(i => i.id !== item.id);
        this.itensAdquiridos.push(item);
        this.calcularTotal();
        this.calcularTotalAdquiridos();
        console.log('Produto marcado como adquirido!');
      } else {
        console.log('Erro ao marcar o produto como adquirido', 'danger');
      }
    } catch (error) {
      console.error('Erro ao marcar o produto como adquirido: ', error);
      console.log('Erro na requisição: ' + error, 'danger');
    }
  }

  /*restituirItem(item: any) {
    this.itensAdquiridos = this.itensAdquiridos.filter(i => i !== item);
    this.itens.push(item);
    this.calcularTotal();
    this.calcularTotalAdquiridos();
  }*/
 async restituirItem(item: any) {
    try {
      const result = await this.serv.marcarComoNaoAdquirido(item.id);
      if (result.ok) {
        this.itensAdquiridos = this.itensAdquiridos.filter(i => i.id !== item.id);
        this.itens.push(item);
        this.calcularTotal();
        this.calcularTotalAdquiridos();
        item.adquirido = false;
        console.log('Produto marcado como não adquirido!');
      } else {
        console.log('Erro ao marcar o produto como não adquirido', 'danger');
      }
    } catch (error) {
      console.error('Erro ao marcar o produto como não adquirido: ', error);
      console.log('Erro na requisição: ' + error, 'danger');
    }
  }
  carregarItens() { 
    this.serv.listarItens()
    .then(result => {
      if (result.ok) {
        //separar itens adquiridos de nao-adquiridos
        //this.itens = result.result;
        this.itens = result.result.filter((item: any) => !item.adquirido);
        this.itensAdquiridos = result.result.filter((item: any) => item.adquirido);
        this.calcularTotal();
        this.calcularTotalAdquiridos();
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
        this.calcularTotal();
        this.presentToast("Produto excluído com sucesso!");
      } else {
        this.presentToast("Erro ao excluir produto: " + result.message, 'danger');
      }
    } catch (error) {
      this.presentToast("Erro na requisição: " + error, 'danger');
    }
  }

  editarItem(produto: any) {
    this.rota.navigate(['/editar-item'], {
      queryParams: {
        id: produto.id,
        nome: produto.nome,
        quantidade: produto.quantidade,
        preco: produto.preco
      }
    });
  }

  calcularTotal() {
    console.log('Itens:', this.itens); // Verifique os dados
    //this.totalValor = this.itens.reduce((acc, item) => acc + parseFloat(item.valor), 0);
    this.totalValor = this.itens.reduce((acc, item) => acc + item.valor, 0);
    console.log('Total:', this.totalValor); // Verifique o total calculado
  }

  calcularTotalAdquiridos() {
    //this.totalValorAdquiridos = this.itensAdquiridos.reduce((acc, item) => acc + parseFloat(item.valor), 0);
    this.totalValorAdquiridos = this.itensAdquiridos.reduce((acc, item) => acc + item.valor, 0);
  }

  logout() {
    this.rota.navigate(['/login']);
  }
  
}
