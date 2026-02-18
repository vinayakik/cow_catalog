import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CowCatalogService } from '../../services/cow-catalog.service';

@Component({
  selector: 'app-cow-detail',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './cow-detail.component.html',
  styleUrl: './cow-detail.component.css'
})
export class CowDetailComponent {
  private route = inject(ActivatedRoute);
  private catalogService = inject(CowCatalogService);

  cow = computed(() => {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    return this.catalogService.getCowById(id);
  });
}
