import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticksToTime',
  standalone: false
})
export class TicksToTimePipe implements PipeTransform {
  // Esto existe mas que nada porque la duracion de las peliculas me vino en ticks de .NET en la metadata
  transform(ticks: number): string {
    if (!ticks) return '';
    const totalSeconds = ticks / 10_000_000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

}
