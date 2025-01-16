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
    return this.isSelected ? 'col-12 mb-4 card bg-success border-light text-white shadow' : 'col-12 mb-4 card';
  }

  constructor() {}
}