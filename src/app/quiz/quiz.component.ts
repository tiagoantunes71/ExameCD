import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../services/quiz.service';
import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  temaAtual: string | null = null;
  questions: any[] = [];
  videos: any[] = [];

  temas = [
    { nome: 'HTML', imagem: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { nome: 'JavaScript', imagem: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { nome: 'PHP', imagem: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    { nome: 'Laravel', imagem: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
    { nome: 'Python', imagem: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { nome: 'Linux', imagem: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    { nome: 'SQL', imagem: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { nome: 'Docker', imagem: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  ];

  currentQuestionIndex = 0;
  selectedAnswer: string | null = null;
  selectedKey: string | null = null;
  showNextButton = false;
  quizFinished = false;
  score = 0;

  constructor(
    private quizService: QuizService,
    private youtubeService: YoutubeService
  ) {}

  carregarPerguntas(tema: string): void {
    this.temaAtual = tema;
    this.questions = [];
    this.videos = [];
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.selectedKey = null;
    this.showNextButton = false;
    this.quizFinished = false;
    this.score = 0;

    this.quizService.getQuestions(tema, 5).subscribe({
      next: (data) => {
        this.questions = data;
        console.log('Perguntas carregadas:', data);
        if (this.questions.length === 0) {
          console.warn('Nenhuma pergunta encontrada para o tema:', tema);
        }
      },
      error: (err) => {
        console.error('Erro ao carregar perguntas:', err);
      }
    });

    this.youtubeService.procurarVideos(tema).subscribe({
      next: (res: any) => {
        this.videos = res.items;
        console.log('Vídeos carregados:', this.videos);
      },
      error: (err) => {
        console.error('Erro ao carregar vídeos:', err);
      }
    });
  }

  getAnswerKeys(answers: any): string[] {
    return Object.keys(answers || {}).filter(key => answers[key]);
  }

  responder(chaveResposta: string): void {
    if (this.selectedKey) {
      return;
    }

    this.selectedKey = chaveResposta;
    this.selectedAnswer = this.questions[this.currentQuestionIndex].answers[chaveResposta];
    this.showNextButton = true;

    const perguntaAtual = this.questions[this.currentQuestionIndex];
    const correctAnswerKey = `${chaveResposta}_correct`;

    if (perguntaAtual.correct_answers && perguntaAtual.correct_answers[correctAnswerKey] === 'true') {
      this.score++;
    }
  }

  proximaPergunta(): void {
    this.currentQuestionIndex++;
    this.selectedAnswer = null;
    this.selectedKey = null;
    this.showNextButton = false;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.quizFinished = true;
    }
  }

  resetQuiz(): void {
    this.temaAtual = null;
    this.questions = [];
    this.videos = [];
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.selectedKey = null;
    this.showNextButton = false;
    this.quizFinished = false;
    this.score = 0;
  }
}
