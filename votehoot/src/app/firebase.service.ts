import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'; // Import compat per FieldValue
import { environment } from '../environments/environment'; // Assicurati che la configurazione Firebase sia corretta

import { Work } from './work.model';
import { Evaluation } from './evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {
    // Verifica che Firebase sia configurato correttamente
    console.log('Firebase environment:', environment);
  }

  /**
   * Ottiene tutti i lavori dalla collezione "works".
   * @returns Observable contenente i lavori.
   */
  getWorks() {
    return this.firestore.collection<Work>('works').valueChanges({ idField: 'id' });
  }

  getUsers() {
    return this.firestore.collection('evaluators').valueChanges({ idField: 'id' })
  }

  addEvaluation(workId: number, evaluation: Evaluation): Promise<void> {

    return this.firestore
      .collection("works")
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
