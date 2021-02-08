import { Component, OnInit } from '@angular/core';
import { FirebaseService, IContents } from 'src/app/firebase/firebase.service';

@Component({
  selector: 'app-arrangment',
  templateUrl: './arrangment.component.html',
  styleUrls: ['./arrangment.component.scss'],
})
export class ArrangmentComponent implements OnInit {
  public arrangments: IContents[] = [];

  constructor(private firebaseService: FirebaseService) {}

  getTranscription() {
    this.firebaseService.getContents('Arrangiamenti').subscribe((res) => {
      this.arrangments = res.map((content) => {
        return {
          ...(content.payload.doc.data() as {}),
          id: content.payload.doc.id,
        } as IContents;
      });
    });
  }

  ngOnInit() {
    this.getTranscription();
  }
  
}
