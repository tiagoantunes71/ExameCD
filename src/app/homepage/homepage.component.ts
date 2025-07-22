import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { QuizComponent } from '../quiz/quiz.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, QuizComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  router = inject(Router);
  authService = inject(AuthService);
}
