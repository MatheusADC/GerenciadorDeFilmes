import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-movie',
  imports: [FormsModule],
  templateUrl: './create-movie.html',
  styleUrl: './create-movie.css',
})
export class CreateMovie {
  title = signal<string>('');
  year = signal<number | undefined>(undefined);
  category = signal<string>('');
  description = signal<string>('');

  // Sinal para armazenar o URL da pré-visualização da imagem
  imagePreview = signal<string | undefined>(undefined);
  selectedFile = signal<File | undefined>(undefined);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      this.selectedFile.set(file);

      if (this.imagePreview()) {
        URL.revokeObjectURL(this.imagePreview()!);
      }
      const objectURL = URL.createObjectURL(file);

      this.imagePreview.set(objectURL);
    }
  }

  salvar() {
    console.log('Filme salvo!');
  }

  cancelar() {
    console.log('Operação cancelada!');
  }
}
