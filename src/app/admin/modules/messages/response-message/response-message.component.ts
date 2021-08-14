import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-response-message',
  templateUrl: './response-message.component.html',
  styleUrls: ['./response-message.component.scss'],
})
export class ResponseMessageComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '200px',
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize', 'insertVideo', 'insertHorizontalRule', 'toggleEditorMode']
    ]
  };

  mensajeForm = this.form.group({
    mensajeText: ['', [Validators.required]],
  });

  constructor(private form: FormBuilder) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
