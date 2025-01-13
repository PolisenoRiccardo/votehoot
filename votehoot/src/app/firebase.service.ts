import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'; // Import compat per FieldValue
import { environment } from '../environments/environment'; // Assicurati che la configurazione Firebase sia corretta
import { v4 as uuidv4 } from 'uuid';
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

  addWork(): Promise<void>
  {
    var workId = uuidv4().toString()
    const newWork = {
      workId,
      title: 'Assistenti Virtuali Medici: Considerazioni Etiche',
      members: ['John', 'Doe'],
      evaluations: [
        {
          citations: 678,
          clarity: 454,
          completeness: 566,
          engagement: 678,
          notesQuality: 45645,
          originality: 6456,
          slidesQuality: 7,
          solutions: 678,
          synthesis: 5,
          timing: 68,
        },
      ],
    }
    return this.firestore
      .collection("works")
      .add(newWork).then(() => {
        console.log("Work added successfully!");
      })
      .catch((error) => {
        console.error("Failed to add work:", error);
        throw error;
      });
  }
}
