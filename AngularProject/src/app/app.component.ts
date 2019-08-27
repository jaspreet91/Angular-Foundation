import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularProject';
  localData = [];
  addUser(Data: { name: string }) {
    console.log(Data);
    this.localData.push(Data[0]);
  }

  deleteUser(ind: number) {
    console.log('user index', ind);
    this.localData.splice(ind, 1);
  }
}
