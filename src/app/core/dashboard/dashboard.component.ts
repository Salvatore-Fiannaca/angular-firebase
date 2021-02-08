import { Component, OnInit } from '@angular/core';
import { FirebaseService, IContents } from '../../firebase/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  public contents: IContents[] = [];
  public newForm: boolean = true;
  public dashboard: boolean = true;
  public objId: string = "";

  constructor(
    private fireBaseService: FirebaseService,
  ) { }

  ngOnInit() {
    this.getAllContents()
    this.newForm = true;
    this.dashboard = true;
  }

  urlPattern  = new RegExp("[A-Za-z0-9- è]*"); //TODO
  textPattern = new RegExp("");
  formGroup = new FormGroup({
    category : new FormControl('Composizioni', [
      Validators.required, 
      Validators.maxLength(20)
    ]),
    title : new FormControl('', [
      Validators.required, 
      Validators.minLength(3),
      Validators.pattern(this.textPattern),
      Validators.maxLength(20)
    ]),
    comment: new FormControl('', [
      Validators.required, 
      Validators.minLength(6),
      Validators.pattern(this.textPattern),
      Validators.maxLength(300)
    ]),
    link_spotify: new FormControl('',[
      Validators.minLength(10),
      Validators.pattern(this.urlPattern),
      Validators.maxLength(100)
    ]),
    link_youtube: new FormControl('',[
      Validators.minLength(10),
      Validators.pattern(this.urlPattern),
      Validators.maxLength(100)
    ]),
    link_pdf: new FormControl('',[
      Validators.minLength(10),
      Validators.pattern(this.urlPattern),
      Validators.maxLength(100)
    ]),
  });

  get form() {
    return this.formGroup;
  }

  newContent() {
    this.newForm = true;
    this.dashboard = false;
    this.objId = "";
    this.formGroup.setValue({
      title : "",
      category: "Composizioni",
      comment: "",
      link_spotify: "", 
      link_youtube: "",
      link_pdf: ""
    });
  }

  editThis(id: string) {
    this.newForm = false;
    this.dashboard = false;
    const item = this.contents.find( item => item.id == id )
    this.formGroup.setValue({
      title : item.title,
      category : item.category,
      comment: item.comment,
      link_spotify: item.links.spotify, 
      link_youtube: "v=" + item.links.youtube,
      link_pdf: item.links.pdf
    });
    this.objId = item.id 
  }

  getAllContents() {
    this.fireBaseService.getAllContents().subscribe(res => {
      this.contents = res.map(content => {
          return {
            ...( content.payload.doc.data() as {} ),
            id: content.payload.doc.id
          } as IContents
        }
      )
    })
  }

  deleteFromId( id: string ) {
    const ele: HTMLElement = document.querySelector("#" + id)
    try {
      ele.remove()
    } catch (error) {
    }

    this.fireBaseService.deleteContent(id)
  }
  
  getYoutubeID(link:string = ""){
    if (link.includes("v=")) {
      return link.split("v=").pop()
    } 
    if (link.includes("/")){
      return link.split("/").pop()
    }
    return ""
  }

  submit(){
    const body = {
      id: "",
      category: this.form.value.category,
      title: this.form.value.title,
      comment: this.form.value.comment,
      links: {
        spotify: this.form.value.link_spotify,
        youtube: this.getYoutubeID(this.form.value.link_youtube),
        pdf: this.form.value.link_pdf
      }
    };
    if ( this.newForm ){
      this.fireBaseService.addContent(body as IContents)
        .then( res => {
          window.location.href = window.location.origin + "/dashboard";
        }
      )
    } else if ( this.objId ) {
      this.fireBaseService.updateContent(this.objId, body as IContents)
        .then( res => {
          window.location.href = window.location.origin + "/dashboard";
        }
      )
    }

  }

  goBack(){
    this.newForm = true;
    this.dashboard = true;
    this.objId = "";
  }


}
