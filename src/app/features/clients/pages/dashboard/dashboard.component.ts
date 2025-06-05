import { Component, inject } from '@angular/core';
import { StadsService } from '../../../../core/services/Stads.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private stadsService = inject(StadsService);

  userStads = rxResource({
    request: () => ({}),
    loader: () => {
      return this.stadsService.getUserAlbumStads();
    },
  });
}
