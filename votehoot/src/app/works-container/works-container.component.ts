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
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getWorks();
  }

  getWorks(): void {
    this.firebaseService.getWorks().subscribe(data => {
      console.log('Dati ricevuti:', data);
      this.firebaseWorks = data;
      this.works = this.firebaseWorks.map((work: any) => {
        return new Work(
          work.id,
          work.title,
          work.members
        );
      });
    });
   }

  selectWork(work: Work): void {
    this.selectedWork = work;
    console.log('Selected work:', this.selectedWork);
  }

  // For testing
  addSampleWork(): void {
    this.firebaseService.addWork({
      id: 96,
      title: 'Sample work',
      members: ['John Doe', 'Jane Doe']
    });
    this.getWorks();
  }


}

