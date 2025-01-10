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
    this.firestoreService.addEvaluation(this.work.id, this.evaluation);
    this.firestoreService.addEvaluated(this.work.id, this.loggedUser.id);
    this.getUsers();
  }

  numberize(data: HTMLInputElement): number {
    return Number(data.value);
  }

  alreadyEvaluated(): boolean {
    if (this.loggedUser.evaluated.includes(this.work.id)) {
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
      console.log('Utenti ricevuti:', data);
      this.users = data;
      this.loggedUser = this.users.find((item: any) => item.votekey === this.userKey)
    });
   }
  
  stampa() {
    console.log(this.loggedUser); 
  }
}
