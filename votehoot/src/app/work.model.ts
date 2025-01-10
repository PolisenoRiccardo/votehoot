import { Evaluation } from './evaluation.model';
 export class Work {
  // Informazioni generali
  id: number; // Identificativo del lavoro
  title: string; // Titolo del lavoro
  members: string[]; // Descrizione del lavoro// Data di creazione
  evaluations !: Evaluation[]; // Elenco delle valutazioni

  constructor(
    id: number,
    title: string,
    members: string[],
  ) {
    this.id = id;
    this.title = title;
    this.members = members;
  }

  // Metodo per calcolare il punteggio medio complessivo
  calculateAverageScore(): number {
    if (this.evaluations.length === 0) return 0; // Se non ci sono valutazioni
    const totalScore = this.evaluations.reduce((sum, evalItem) => sum + evalItem.totalScore(), 0);
    return totalScore / this.evaluations.length;
  }
}
