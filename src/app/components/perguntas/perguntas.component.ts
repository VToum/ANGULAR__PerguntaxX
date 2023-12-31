import { Component, OnInit } from '@angular/core';
import perguntaxX_questao  from '../../../assets/data/perguntaxX_questao.json'; 

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  styleUrls: ['./perguntas.component.css']
})
export class PerguntasComponent implements OnInit {

  titulo: string = "Pronto para descobrir ?"

  questao: any;
  questaoSelecionada: any;

  respostas: string[] = [];
  perguntaSelecionada: string = "";

  questionIndex:number = 0;
  questionMaxIndex:number = 0;



  fim: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    if(perguntaxX_questao){
      this.fim = false;
      this.titulo = perguntaxX_questao.title;
      this.questao = perguntaxX_questao.questions;
      this.questaoSelecionada = this.questao[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = perguntaxX_questao.questions.length;

      console.log(this.questionIndex);
      console.log(this.questionMaxIndex);

    }
  }

  opcaoSelecionada(valor: string){
    this.respostas.push(valor);
    this.proximaQuestao();
    console.log(this.respostas)
  }

  async proximaQuestao(){
    this.questionIndex+=1;
    const resultadoFinal: string = await this.checkResultado(this.respostas);

    if(this.questionIndex < this.questionMaxIndex ){
      this.questaoSelecionada = this.questao[this.questionIndex]
    }else{
      this.fim = true;
      this.questaoSelecionada = perguntaxX_questao.results[resultadoFinal as keyof typeof perguntaxX_questao.results ]
    }
  }

  async checkResultado(resposta: string[]){
    const resultado = resposta.reduce((previus, current, i, arr) => {
      if(
        arr.filter(item => item == previus).length >
        arr.filter(item => item == current).length

      ){
        return previus;

      }else{
        return current;

      }
    })
  
    return resultado;
  }

  jogarNovamente(){
    window.location.reload()
  }
}
