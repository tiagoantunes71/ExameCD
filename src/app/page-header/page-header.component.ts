import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent {
  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit(): void {
      this.authService.supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
          this.authService.currentUser.set({
            email: session?.user.email!,
            username:
              session?.user.identities?.at(0)?.identity_data?.['username'],
          });
        } else if (event === 'SIGNED_OUT') {
          this.authService.currentUser.set(null);
        }
      });
  }


  async logout(): Promise<void> {
  await this.authService.logout();
  this.router.navigate(['/login']); // ou a rota que quiseres
}
}
