import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Work } from '../work.model';

@Component({
  selector: 'app-container',
  templateUrl: './works-container.component.html',
  styleUrls: ['./works-container.component.css']
})

export class WorksContainerComponent implements OnInit {
  title = 'votehoot';
  firebaseWorks: any;
  works: Work[] = [];
  selectedWork !: Work;
  voteKey !: string;
  users: any;
  votekeys: string[] = [];
  userName !: string;
  loggedUser !: any;
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getWorks();
    this.getUsers();
  }

  getWorks(): void {
    this.firebaseService.getWorks().subscribe((data: any) => {
      console.log('Dati ricevuti:', data);
      this.firebaseWorks = data;
      this.works = this.firebaseWorks.map((work: any) => {
        return new Work(
          work.id,
          work.title,
          work.members,
          work.workScore
        );
      });
    });
   }

   getUsers(): void {
    this.firebaseService.getUsers().subscribe((data: any) => {
      console.log('Utenti ricevuti:', data);
      this.users = data;
      for (let i = 0; i < data.length; i++) {
        this.votekeys.push(data[i].votekey);
      }
    });
   }

  selectWork(work: Work): void {
    this.selectedWork = work;
    console.log('Selected work:', this.selectedWork);
  }

  login(userKey:HTMLInputElement): void {
    
    if (this.votekeys.includes(userKey.value)) {
      this.voteKey = userKey.value;
      this.loggedUser = this.users.find((item: any) => item.votekey === this.voteKey)
      this.userName = this.loggedUser.Nome;
      console.log('Nome trovato:', this.userName);
      console.log('Utente trovato:', this.voteKey);
    } else {
      alert('Utente non trovato!');
    }
    
  }

  addWork(): void{
    console.log('Adding work...');
    this.firebaseService.addWork();
  }
}

