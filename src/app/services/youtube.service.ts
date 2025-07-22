import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private http = inject(HttpClient);
  private baseUrl = environment.youtubeApiUrl;
  private apiKey = environment.youtubeApiKey; // Coloca esta chave no environment

  /**
   * Pesquisa vídeos com base num termo.
   * @param query Termo de pesquisa
   */
  procurarVideos(query: string) {
    const params = {
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: '5',
      key: this.apiKey
    };

    return this.http.get(this.baseUrl, { params });
  }
}
