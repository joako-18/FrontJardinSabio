import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../services/publication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../services/token.service'; // Importa el TokenService
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.scss'],
})
export class ComunidadComponent implements OnInit {
  publications: any[] = [];
  publicationForm: FormGroup;

  constructor(
    private publicationService: PublicationService,
    private fb: FormBuilder,
    private tokenService: TokenService // Inyección del servicio TokenService
  ) {
    // Inicializar formulario de publicación
    this.publicationForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      file: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPublications();
  }

  // Cargar publicaciones desde la API
  loadPublications(): void {
    this.publicationService.getPublications().subscribe({
      next: (data) => {
        this.publications = data;
      },
      error: (err) => {
        console.error('Error al cargar publicaciones:', err);
        this.publications = [];
      },
    });
  }

  // Crear una nueva publicación
  onCreatePublication(): void {
    const userId = this.tokenService.getUserIdFromToken(); // Usar el servicio TokenService
    console.log('User ID desde el token:', userId); // Verificar el valor

    if (!userId) {
      alert('Error de autenticación. Por favor, inicia sesión nuevamente.');
      return;
    }

    if (this.publicationForm.invalid) {
      alert('Por favor, completa el formulario correctamente.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.publicationForm.value.title);
    formData.append('content', this.publicationForm.value.content);
    formData.append('file', this.publicationForm.value.file);

    this.publicationService.createPublication(userId, formData).subscribe(
      (response) => {
        alert('Publicación creada con éxito.');
        this.publicationForm.reset();
        this.loadPublications();
      },
      (error) => {
        console.error('Error al crear publicación:', error);
        alert('No se pudo crear la publicación.');
      }
    );
  }

  // Eliminar publicación
  onDeletePublication(id_publication: number): void {
    const userId = this.tokenService.getUserIdFromToken(); // Usar el servicio TokenService
    if (!userId) {
      alert('Error de autenticación. Por favor, inicia sesión nuevamente.');
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      this.publicationService.deletePublication(userId, id_publication).subscribe(
        () => {
          alert('Publicación eliminada.');
          this.loadPublications();
        },
        (error) => {
          console.error('Error al eliminar publicación:', error);
          alert('No se pudo eliminar la publicación.');
        }
      );
    }
  }

  // Manejar archivo seleccionado
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.publicationForm.patchValue({ file });
    }
  }
}
