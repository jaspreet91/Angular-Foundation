import { Component, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('serverContent', { static: false }) serverContent: ElementRef;

  ngOnInit() {
  }

  addUser(user: HTMLInputElement) {
    console.log(user.value);
    this.showName.push(this.userData);
    this.userName.emit(this.showName);
  }

}
