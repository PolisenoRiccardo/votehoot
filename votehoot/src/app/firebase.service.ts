import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';  // Assicurati che la configurazione Firebase sia in environment.ts

// Import di AngularFireModule e AngularFirestoreModule nel modulo principale (AppModule)
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) {
    // Firebase è già inizializzato tramite AngularFireModule nel modulo principale
    console.log(environment);  // Verifica che l'oggetto environment sia configurato correttamente
  }

  // Metodo per ottenere tutti i lavori
  getWorks() {
    return this.firestore.collection('works').valueChanges();
  }
  
}
