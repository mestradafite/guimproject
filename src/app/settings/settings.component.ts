import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private limits: string[] = ["Sin Límite"];
  private languages: string[] = ["ESP", "CAT", "ENG"];
  private categories: string[] = ["Todas", "Sunglasses", "Shirt", "Shorts"];
  private tags: string[] = ["Todas", "Chic", "Vintage", "Cool"];

  constructor() { }


  ngOnInit(): void {
  }

}
