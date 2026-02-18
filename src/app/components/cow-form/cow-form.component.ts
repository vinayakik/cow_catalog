import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CowCatalogService } from '../../services/cow-catalog.service';

@Component({
  selector: 'app-cow-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cow-form.component.html',
  styleUrl: './cow-form.component.css'
})
export class CowFormComponent {
  private fb = inject(FormBuilder);
  private catalogService = inject(CowCatalogService);
  private router = inject(Router);

  statuses = this.catalogService.getStatuses();
  errorMessage = signal<string>('');

  form = this.fb.nonNullable.group({
    earTag: ['', [Validators.required]],
    sex: ['Female', [Validators.required]],
    pen: ['', [Validators.required]],
    status: ['Active', [Validators.required]],
    weight: this.fb.control<number | null>(null, [Validators.min(0.01)])
  });

  save(): void {
    this.errorMessage.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      const cow = this.catalogService.addCow({
        earTag: this.form.controls.earTag.value,
        sex: this.form.controls.sex.value,
        pen: this.form.controls.pen.value,
        status: this.form.controls.status.value,
        weight: this.form.controls.weight.value ?? undefined
      });

      this.router.navigate(['/cows', cow.id]);
    } catch (error) {
      this.errorMessage.set(error instanceof Error ? error.message : 'Unable to save cow.');
    }
  }
}
