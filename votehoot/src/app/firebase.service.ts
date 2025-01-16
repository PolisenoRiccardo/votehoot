import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'; // Import compat per FieldValue
import { Work } from './work.model';
import { Evaluation } from './evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  /**
   * Ottiene tutti i lavori dalla collezione "works".
   * @returns Observable contenente i lavori.
   */
  getWorks() {
    return this.firestore.collection<Work>('works_well').valueChanges({ idField: 'id' });
  }

  getUsers() {
    return this.firestore.collection('evaluators').valueChanges({ idField: 'id' })
  }


  addEvaluation(workId: number, evaluation: Evaluation): Promise<void> {

    return this.firestore
      .collection("works_well")
      .doc(workId.toString())
      .update({
        evaluations: firebase.firestore.FieldValue.arrayUnion(evaluation.toFirestoreObject()) // Usa arrayUnion per aggiungere alla lista
      })
      .then(() => {
        console.log("Valutazione aggiunta con successo!");
      })
      .catch((error) => {
        console.error("Errore durante l'aggiunta della valutazione:", error);
        throw error;
      });
  }

  addEvaluated(workId: number, evaluatorId: string): Promise<void> {
    return this.firestore
      .collection("evaluators")
      .doc(evaluatorId.toString())
      .update({
        evaluated: firebase.firestore.FieldValue.arrayUnion(workId) // Usa arrayUnion per aggiungere alla lista
      })
      .then(() => {
        console.log("Valutazione aggiunta con successo!");
      })
      .catch((error) => {
        console.error("Errore durante l'aggiunta del valutatore:", error);
        throw error;
      });
  }

}
