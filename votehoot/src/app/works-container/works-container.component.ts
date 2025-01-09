import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-container',
  templateUrl: './works-container.component.html',
  styleUrls: ['./works-container.component.css']
})

export class WorksContainerComponent implements OnInit {
  title = 'votehoot';
  works: any;
  constructor(private firebaseService: FirebaseService) {}
  
  ngOnInit(): void { 
    this.firebaseService.getWorks().subscribe(data => {
      console.log('Dati ricevuti:', data); 
      this.works = data; 
    }); 
  }
}

