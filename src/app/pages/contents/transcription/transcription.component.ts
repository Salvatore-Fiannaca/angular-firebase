import { Component, OnInit } from '@angular/core';
import { FirebaseService, IContents } from 'src/app/firebase/firebase.service';

@Component({
  selector: 'app-transcription',
  templateUrl: './transcription.component.html',
  styleUrls: ['./transcription.component.scss'],
})
export class TranscriptionComponent implements OnInit {
  public transcriptions: IContents[] = [];

  constructor(private firebaseService: FirebaseService) {}

  getTranscription() {
    this.firebaseService.getContents('Trascrizioni').subscribe((res) => {
      this.transcriptions = res.map((content) => {
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
