import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true // Esto hace que sea independiente
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number | string): string {
    // Convertir el valor a número
    const numValue = typeof value === 'string' ? parseInt(value, 10) : value;

    if (isNaN(numValue) || numValue < 0) {
      return '00:00:00'; // Formato predeterminado para valores inválidos
    }

    // Asegurarnos de que no exceda 23 para horas
    const hours = Math.floor(numValue % 24).toString().padStart(2, '0');

    // Formato fijo para minutos y segundos
    const minutes = '00';
    const seconds = '00';

    return `${hours}:${minutes}:${seconds}`;
  }
}
