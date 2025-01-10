import { Component, Input } from '@angular/core';
import { Work } from '../work.model';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent {
  @Input() work!: Work;
  constructor () {}

}
