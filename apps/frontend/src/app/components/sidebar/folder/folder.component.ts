import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
})
export class FolderComponent implements OnInit { 

  @Input('title') title: any

  constructor() { }

  ngOnInit(): void {
  }

}
