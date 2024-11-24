import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../services/publication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comunidad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.scss'],
})
export class ComunidadComponent implements OnInit {
  publications: any[] = [];
  publicationForm: FormGroup;

  constructor(
    private publicationService: PublicationService,
    private fb: FormBuilder
  ) {
    // Inicializar formulario de publicación
    this.publicationForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      file: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPublications(); // Cargar publicaciones al iniciar
  }

  // Cargar publicaciones desde la API
  loadPublications(): void {
    this.publicationService.getPublications().subscribe({
      next: (data) => {
        this.publications = data;
      },
      error: (err) => {
        console.error('Error al cargar publicaciones:', err);
        this.publications = []; // Manejar el error asignando un valor por defecto
      },
    });
  }

  // Crear una nueva publicación
  onCreatePublication(id_user: number): void {
    if (this.publicationForm.invalid) {
      alert('Por favor, completa el formulario correctamente.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.publicationForm.value.title);
    formData.append('content', this.publicationForm.value.content);
    formData.append('file', this.publicationForm.value.file);

    this.publicationService.createPublication(id_user, formData).subscribe(
      (response) => {
        alert('Publicación creada con éxito.');
        this.publicationForm.reset(); // Reiniciar el formulario
        this.loadPublications(); // Recargar publicaciones
      },
      (error) => {
        console.error('Error al crear publicación:', error);
        alert('No se pudo crear la publicación.');
      }
    );
  }

  // Eliminar publicación
  onDeletePublication(id_user: number, id_publication: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      this.publicationService.deletePublication(id_user, id_publication).subscribe(
        () => {
          alert('Publicación eliminada.');
          this.loadPublications(); // Recargar publicaciones
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

