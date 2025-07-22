import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private http = inject(HttpClient);

  private apiUrl = environment.quizApiUrl;
  private apiKey = environment.quizApiKey;

  getQuestions(category: string = '', limit: number = 5): Observable<any> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey
    });

    const params: any = {
      limit: limit.toString(),
      difficulty: 'Easy' 
    };

    if (category) {
      params.category = category;
    }

    return this.http.get(this.apiUrl, { headers, params });
  }
}
