import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Reveal } from '../../shared/reveal/reveal';
import { ANTI_PATTERNS, PHASES, RETRY_SNIPPET, THESES } from './content';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, ClipboardModule, MatButtonModule, MatCardModule, MatIconModule, MatSnackBarModule, MatTooltipModule, Reveal],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  private readonly snack = inject(MatSnackBar);

  readonly theses = THESES;
  readonly antiPatterns = ANTI_PATTERNS;
  readonly phases = PHASES;
  readonly snippet = RETRY_SNIPPET;
  readonly pixKey = '[SUA CHAVE PIX]';

  copied(ok: boolean, what: string) {
    this.snack.open(ok ? `${what} copiado` : 'Não foi possível copiar', undefined, { duration: 2500 });
  }
}
