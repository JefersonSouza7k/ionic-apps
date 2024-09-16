import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConexaoApiService {

  api_url : string = 'http://localhost/producao/app-compras/api/api.php';

  constructor(private http : HttpClient) { }

  login(email: string, senha: string) : Promise<any> {
    const body = {
      action: 'logar',
      email: email,
      senha: senha 
    };

    let bodyFd = new FormData();
    bodyFd.append('data', JSON.stringify(body));

    return fetch(this.api_url, {
      method: 'POST',
      body: bodyFd
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error: ', error);
      throw error;
    })
  } 

  // ConexaoApiService
  async criarConta(nome: string, email: string, senha: string): Promise<any> {
    try {
      const response = await fetch('http://localhost/producao/app-compras/api/api.php', {
        method: 'POST',
        body: new URLSearchParams({
          'data': JSON.stringify({
            action: 'verificarEmail',
            email: email
          })
        })
      });
      
      const verificarEmailResult = await response.json();

      if (verificarEmailResult.ok && verificarEmailResult.emailExiste) {
        return { ok: false, status: 409, message: 'Email já cadastrado!' }; // Email já existe
      }

      // Se o email não existir, prosseguir para criar conta
      const result = await fetch('http://localhost/producao/app-compras/api/api.php', {
        method: 'POST',
        body: new URLSearchParams({
          'data': JSON.stringify({
            action: 'criarConta',
            nome: nome,
            email: email,
            senha: senha
          })
        })
      });

      return await result.json();
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      return { ok: false, status: 500, message: 'Erro ao criar conta!' };
    }
  }

  listarItens() {
    const body = {
      'action' : 'listarItens'
    }

    let bodyFd = new FormData();
    bodyFd.append('data', JSON.stringify(body));

    return fetch(this.api_url, {
      method: 'POST',
      body : bodyFd
    })
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => {
      console.error('Erro ao listar os itens: ', error);
      throw error;
    })
  }

  cadastrarProduto(produto : string, quantidade : number, preco : number) {
    const body = {
      'action' : 'cadastrarProduto',
      'produto' : produto,
      'qtd' : quantidade, 
      'preco' : preco
    }

    let bodyFd = new FormData();
    bodyFd.append('data', JSON.stringify(body))

    return fetch(this.api_url, {
      method: 'POST',
      body: bodyFd
    })
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => {
      console.error('Erro ao cadastrar o produto: ', error);
      throw error; 
    });

  }

  excluirProduto(id : number) {
    const body = {
      'action' : 'excluirProduto',
      'id' : id
    };

    let bodyFd = new FormData();
    bodyFd.append('data', JSON.stringify(body));

    return fetch(this.api_url, {
      method: 'POST',
      body : bodyFd
    })
    .then(response => response.json())
    .then(data => {
      return data
    });
  }

    obterProdutoPorId(id: number): Promise<any> {
    const body = {
      action: 'obterProdutoPorId',
      id: id
    };

    let bodyFd = new FormData();
    bodyFd.append('data', JSON.stringify(body));

    return fetch(this.api_url, {
      method: 'POST',
      body: bodyFd
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Erro ao obter os dados do produto: ', error);
      throw error;
    });
  }

    atualizarProduto(id: number, nome: string, quantidade: number, preco: number): Promise<any> {
    const body = {
      action: 'editarProduto',
      id: id,
      produto: nome,
      qtd: quantidade,
      preco: preco
    };

    let bodyFd = new FormData();
    bodyFd.append('data', JSON.stringify(body));

    return fetch(this.api_url, {
      method: 'POST',
      body: bodyFd
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Erro ao atualizar o produto: ', error);
      throw error;
    });
  }

  marcarComoAdquirido(id: number): Promise<any> {
    const body = {
      action : 'marcarAdquirido',
      id: id
    };

    let bodyFd = new FormData();
    bodyFd.append('data', JSON.stringify(body));

    return fetch(this.api_url, {
      method: 'POST',
      body: bodyFd
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Erro ao marcar produto como adquirido: ', error);
      throw error;
    });
  }

  marcarComoNaoAdquirido(id: number): Promise<any> {
    const body = {
      action: 'marcarNaoAdquirido',
      id: id
    };

    let bodyFd = new FormData();
    bodyFd.append('data', JSON.stringify(body));

    return fetch(this.api_url, {
      method: 'POST',
      body: bodyFd
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Erro ao marcar produto como não adquirido: ', error);
      throw error;
    });
  }

}
