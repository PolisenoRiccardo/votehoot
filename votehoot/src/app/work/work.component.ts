import { Component, HostBinding, Input } from '@angular/core';
import { Work } from '../work.model';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent {
  @Input() work!: Work;
  @Input() isSelected: boolean = false;

  @HostBinding('class') get cssClass() {
    console.log('work:', this.isSelected);
    return this.isSelected ? 'col-12 mb-4 card bg-primary text-white shadow' : 'col-12 mb-4 card';
  }

  constructor() {}
}