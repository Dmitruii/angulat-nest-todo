import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  constructor(private location: Location) {}
 
  back(): void {
    this.location.back()
  }

}
