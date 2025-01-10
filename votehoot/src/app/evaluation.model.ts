export class Evaluation {
  clarity: number; // Chiarezza della Presentazione (max 20)
  completeness: number; // Completezza dell'Analisi (max 25)
  originality: number; // Originalità del Caso Scelto (max 10)
  notesQuality: number; // Note del Relatore (max 10)
  slidesQuality: number; // Qualità delle Slide (max 10)
  synthesis: number; // Capacità di Sintesi (max 10)
  citations: number; // Citazioni e Fonti (max 5)
  solutions: number; // Soluzioni Proposte (max 20)
  engagement: number; // Capacità di Coinvolgimento (max 5)
  timing: number; // Rispetto dei Tempi (max 5)

  constructor(
    clarity: number,
    completeness: number,
    originality: number,
    notesQuality: number,
    slidesQuality: number,
    synthesis: number,
    citations: number,
    solutions: number,
    engagement: number,
    timing: number
  ) {
    this.clarity = clarity;
    this.completeness = completeness;
    this.originality = originality;
    this.notesQuality = notesQuality;
    this.slidesQuality = slidesQuality;
    this.synthesis = synthesis;
    this.citations = citations;
    this.solutions = solutions;
    this.engagement = engagement;
    this.timing = timing;
  }

  // Metodo per calcolare il punteggio totale assegnato
  totalScore(): number {
    return (
      this.clarity +
      this.completeness +
      this.originality +
      this.notesQuality +
      this.slidesQuality +
      this.synthesis +
      this.citations +
      this.solutions +
      this.engagement +
      this.timing
    );
  }

  evaluationArray(): number[] { 
    return [
      this.clarity,
      this.completeness,
      this.originality,
      this.notesQuality,
      this.slidesQuality,
      this.synthesis,
      this.citations,
      this.solutions,
      this.engagement,
      this.timing
    ];
  }

  // Metodo per trasformare l'oggetto in un oggetto piatto
  toFirestoreObject() {
    return {
      clarity: this.clarity,
      completeness: this.completeness,
      originality: this.originality,
      notesQuality: this.notesQuality,
      slidesQuality: this.slidesQuality,
      synthesis: this.synthesis,
      citations: this.citations,
      solutions: this.solutions,
      engagement: this.engagement,
      timing: this.timing
    };
  }
}
