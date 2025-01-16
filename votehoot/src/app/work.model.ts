import { Evaluation } from './evaluation.model';

export class Work {
  id: number;
  title: string;
  members: string[];
  evaluations: Evaluation[] = [];
  workScore!: number;

  constructor(
    id: number,
    title: string,
    members: string[],
    evaluations: Evaluation[] = []
  ) {
    this.id = id;
    this.title = title;
    this.members = members;
    this.evaluations = evaluations;
  }

  // Metodo per calcolare il punteggio medio complessivo
   calculateAverageScores(): number {
    // Verifica se l'array è vuoto
    if (this.evaluations.length === 0) {
        return 0; // Se l'array è vuoto, restituisce 0
    }

    // Calcola la somma dei voti per ogni dizionario
    const sums = this.evaluations.map(dict => {
        return Object.values(dict).reduce((sum, value) => sum + value, 0);
    });

    // Calcola la media delle somme
    const totalSum = sums.reduce((acc, current) => acc + current, 0);
    const average = totalSum / sums.length;

    return Math.floor(average / 12);
  }
}