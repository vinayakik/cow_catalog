import { DatePipe, NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CowCatalogService } from '../../services/cow-catalog.service';

@Component({
  selector: 'app-cow-list',
  standalone: true,
  imports: [FormsModule, RouterLink, DatePipe, NgClass],
  templateUrl: './cow-list.component.html',
  styleUrl: './cow-list.component.css'
})
export class CowListComponent {
  private catalogService = inject(CowCatalogService);
  private router = inject(Router);

  statuses = this.catalogService.getStatuses();
  cows = this.catalogService.listFilteredCows;
  pens = computed(() => this.catalogService.getAvailablePens());
  filters = this.catalogService.filters;

  clearFilters(): void {
    this.catalogService.resetFilters();
    this.router.navigate(['/cows'], { queryParams: {}, replaceUrl: true });
  }

  onSearchInput(value: string): void {
    this.catalogService.setFilters({ ...this.filters(), search: value });
  }

  onStatusChange(value: string): void {
    this.catalogService.setFilters({ ...this.filters(), status: value });
  }

  onPenChange(value: string): void {
    this.catalogService.setFilters({ ...this.filters(), pen: value });
  }

  statusBadgeClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'text-bg-success';
      case 'In Treatment':
        return 'text-bg-warning';
      case 'Deceased':
        return 'text-bg-danger';
      default:
        return 'text-bg-secondary';
    }
  }
}

