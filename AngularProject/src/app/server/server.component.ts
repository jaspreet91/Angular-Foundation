import { Component, OnInit } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  constructor() { }

  displayTxt;

  ngOnInit() {
  }

  displayText() {
  this.displayTxt = !this.displayTxt;
  }

}
