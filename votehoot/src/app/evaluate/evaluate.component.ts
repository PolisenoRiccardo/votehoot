import { Component, Input } from '@angular/core';
import { Work } from '../work.model';

import { FirebaseService } from '../firebase.service'; // Adjust the path as necessary
import { Evaluation } from '../evaluation.model';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent {
  @Input() work!: Work;
  evaluation !: Evaluation;
  constructor(private firestoreService: FirebaseService) {}

  evaluate(clarity: number, completeness: number, originality: number, notesQuality: number, slidesQuality: number, synthesis: number, citations: number, solutions: number, engagement: number, timing: number): void {
    this.evaluation = new Evaluation(clarity, completeness, originality, notesQuality, slidesQuality, synthesis, citations, solutions, engagement, timing);
    this.firestoreService.addEvaluation(this.work.id, this.evaluation);
  }
}
