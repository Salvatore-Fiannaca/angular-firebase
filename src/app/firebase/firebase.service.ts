import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getContents(category: string = ""){
    return this.firestore.collection('contents', ref => ref.where('category', '==', category))
    .snapshotChanges();
  }

  getAllContents(){
    return this.firestore.collection('contents').snapshotChanges();
  }

  addContent(payload: IContents){
    return this.firestore.collection('contents').add(payload);
  }

  updateContent(contentId: string, payload: IContents){
    return this.firestore.collection('contents').doc(contentId).update(payload);
  }

  deleteContent(contentId: string){
    return this.firestore.collection('contents').doc(contentId).delete();
  }
  
}

export interface IContents{
  id: string;
  category: string;
  title: string;
  comment: string;
  links: {
    spotify;
    youtube;
    pdf;
  }
}