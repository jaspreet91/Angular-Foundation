import { Component, OnInit, Output } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  constructor() { }

  @Output() userName = new EventEmitter<any>();
  showName = [];
  userData = '';

  ngOnInit() {
  }

  addUser() {
    this.showName.push(this.userData);
    this.userName.emit(this.showName);
  }

}
