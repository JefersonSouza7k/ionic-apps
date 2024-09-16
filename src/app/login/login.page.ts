import { Component, ViewChild, OnInit } from '@angular/core';
import { ConexaoApiService } from '../services/conexao-api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  selectedSegment: string = 'logar';

  email: string = '';
  senha: string = '';
  nome: string = '';
  emailCriar: string = '';
  senhaCriar: string = '';
  confirmarSenha: string = '';
  isLogin: boolean = true;

  verSenha: boolean = false; 

  constructor(private serv : ConexaoApiService, private rota : Router, private toast : ToastController) { }

  ngOnInit() {
    
  }

  async login(){
    if (this.email && this.senha){
      try {
        const result = await this.serv.login(this.email, this.senha);
        console.log(result)
        if(result.ok) {

          const usuario = result.user;
          const nomeUsuario = usuario.nome;

          //Mensagem de sucesso
          const toast = await this.toast.create({
            message: `Bem-vindo, ${nomeUsuario}!`,
            color: 'success',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();

          this.rota.navigate(['/listar-itens']);
          this.limparCamposLogin();

        } else {
          if (result.status === 401 && result.message.includes('Email e/ou senha inválidos!')) {
            //Mensagem de erro e direcionamento para criar conta
            const toast = await this.toast.create({
            message: 'Email não encontrado. Você pode criar uma conta.',
            color: 'danger',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();

          //this.selectedSegment = 'criar-conta';
          } else {
            //Mensagem de erro geral
            const toast = await this.toast.create({
            message: 'Não foi possível realizar o login',
            color: 'danger',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();

          this.selectedSegment = 'criar-conta';
          }
        }
      } catch (error) {
        console.error('Erro ao fazer o login: ', error);
        const toast = await this.toast.create({
          message: 'Erro ao fazer login',
          color: 'danger',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
      }
    }
  }

  async criarConta(){
    if (this.nome && this.emailCriar && this.senhaCriar && this.senhaCriar === this.confirmarSenha) {
      try {
        const result = await this.serv.criarConta(this.nome, this.emailCriar, this.senhaCriar);
        if (result.ok){
          const toast = await this.toast.create({
            message: 'Conta criada com sucesso!',
            color: 'success',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();

          // Alternar para tela de login
          this.selectedSegment = 'logar';
          this.limparCamposCriarConta();

        } else {
          const toast = await this.toast.create({
            message: result.message || 'Não foi possível criar a conta',
            color: 'danger',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();

          //this.selectedSegment = 'logar';
        }
      } catch (error) {
        console.error('Erro ao criar a conta: ', error);
        const toast = await this.toast.create({
          message: 'Erro ao criar a conta!',
          color: 'danger',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
      }
    }
  }

  toggleVisibilidadeSenha(){
    this.verSenha = !this.verSenha;
  }

  limparCamposLogin(){
    this.email = '';
    this.senha = '';
  }

  limparCamposCriarConta(){
    this.nome = '';
    this.emailCriar = '';
    this.senhaCriar = '';
    this.confirmarSenha = '';
  }
}
