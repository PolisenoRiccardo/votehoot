import { Component, Input } from '@angular/core';
import { Work } from '../work.model';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent {
  @Input() work!: Work;
  constructor () {}
}
