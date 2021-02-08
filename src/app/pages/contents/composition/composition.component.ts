import { Component } from '@angular/core';
import { FirebaseService, IContents } from 'src/app/firebase/firebase.service';

@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrls: ['./composition.component.scss'],
})
export class CompositionComponent {
  public compositions: IContents[] = [];

  constructor(private firebaseService: FirebaseService) {}

  getTranscription() {
    this.firebaseService.getContents('Composizioni').subscribe((res) => {
      this.compositions = res.map((content) => {
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
