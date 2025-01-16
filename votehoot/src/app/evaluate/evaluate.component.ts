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
  @Input() userKey !: string;
  @Input() loggedUser !: any;
  users: any;
  evaluation !: Evaluation;

  constructor(private firestoreService: FirebaseService) {}

  evaluate(clarity: HTMLInputElement, completeness: HTMLInputElement, originality: HTMLInputElement, 
            notesQuality: HTMLInputElement, slidesQuality: HTMLInputElement, synthesis: HTMLInputElement, 
            citations: HTMLInputElement, solutions: HTMLInputElement, engagement: HTMLInputElement, timing: HTMLInputElement): void {

    const inputs = [clarity.value, completeness.value, originality.value, notesQuality.value, slidesQuality.value, synthesis.value, citations.value, solutions.value, engagement.value, timing.value];
    if (inputs.some(input => input === "")) {
      alert('Tutti i campi devono essere compilati! Attenziòn!');
      return;
    }

    this.evaluation = new Evaluation(
      this.numberize(clarity),
      this.numberize(completeness),
      this.numberize(originality),
      this.numberize(notesQuality),
      this.numberize(slidesQuality),
      this.numberize(synthesis),
      this.numberize(citations),
      this.numberize(solutions),
      this.numberize(engagement),
      this.numberize(timing)
    );
    
    if (this.evaluation.totalScore() > 120) {
      alert('Il punteggio totale non può superare 120, RISPETTA I LIMITI!');
    } else { 
      
      this.firestoreService.addEvaluation(this.work.id, this.evaluation);
      this.firestoreService.addEvaluated(this.work.id, this.loggedUser.id);
      this.getUsers(); 
    }

  }

  numberize(data: HTMLInputElement): number {
    return Number(data.value);
  }

  alreadyEvaluated(): boolean {
    let votiInviati = this.loggedUser.evaluated || [];
    if (votiInviati.includes(this.work.id)) {
      return true;
    } else return false;
  }

  isDisabled(): boolean {
    if (this.loggedUser && !(this.alreadyEvaluated())) {
    return false;
    } else return true;
  }

  getUsers(): void {
    this.firestoreService.getUsers().subscribe((data: any) => {
      this.users = data;
      this.loggedUser = this.users.find((item: any) => item.votekey === this.userKey)
    });
   }
  
}
