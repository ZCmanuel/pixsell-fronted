import { Component, effect, inject } from '@angular/core';
import { StadsService } from '../../../../core/services/Stads.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Chart } from 'chart.js/auto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private stadsService = inject(StadsService);

  usersStads = rxResource({
    request: () => ({}),
    loader: () => this.stadsService.getUsersStads(),
  });

  albumsStads = rxResource({
    request: () => ({}),
    loader: () => this.stadsService.getAlbumsStads(),
  });

  getUserGrowthPercent(): number {
    const semanas = this.usersStads.value()?.usuarios_por_semana;
    if (!semanas || semanas.length < 2) return 0;

    const currentWeek = semanas[semanas.length - 1].total;
    const prevWeek = semanas[semanas.length - 2].total;

    if (prevWeek === 0) return 100;
    const growth = ((currentWeek - prevWeek) / prevWeek) * 100;
    return Math.round(growth);
  }

  constructor() {
    // Efecto para inicializar el gráfico de usuarios
    effect(() => {
      const usersData = this.usersStads.value();
      if (usersData) {
        this.initUsersChart(usersData.usuarios_por_semana);
      }
    });

    // Efecto para inicializar los gráficos de álbumes
    effect(() => {
      const albumsData = this.albumsStads.value();
      if (albumsData) {
        this.initAlbumsPieChart(albumsData.albumes_por_estado);
        this.initAlbumsChart(albumsData.albumes_por_semana);
      }
    });

    // Cargar los datos iniciales
    this.usersStads;
    this.albumsStads;
  }

  private initUsersChart(data: { week: number; total: number }[]): void {
    const ctx = document.getElementById('usersChart') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((item) => `Semana ${item.week}`), // Etiquetas de las semanas
        datasets: [
          {
            label: 'Usuarios registrados',
            data: data.map((item) => item.total), // Datos de usuarios registrados
            borderColor: 'rgba(66, 148, 255, 1)', // Azul sólido
            backgroundColor: 'rgba(66, 148, 255, 0.2)', // Azul con transparencia
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  private initAlbumsPieChart(data: { estado: string; total: number }[]): void {
    const ctx = document.getElementById('albumsPieChart') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map((item) => item.estado),
        datasets: [
          {
            data: data.map((item) => item.total),
            backgroundColor: [
              '#bbf7d0',
              'rgba(239, 68, 68, 0.7)',
              '#bfdbfe',
              '#FBBF24',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
        },
      },
    });
  }

  private initAlbumsChart(data: { week: number; total: number }[]): void {
    const ctx = document.getElementById('albumsChart') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((item) => `Semana ${item.week}`),
        datasets: [
          {
            label: 'Álbumes creados',
            data: data.map((item) => item.total),
            backgroundColor: '#bfdbfe',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }
}
