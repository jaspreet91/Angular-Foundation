import { Component, OnInit } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  constructor() { }

  userName;
  showName = [];

  ngOnInit() {
  }

  addUser() {
    this.showName.push(this.userName);
  }

  deleteUser(index: number) {
    this.showName.splice(index, 1);
  }
}
