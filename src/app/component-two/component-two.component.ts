import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-two',
  templateUrl: './component-two.component.html',
  styleUrls: ['./component-two.component.sass']
})
export class ComponentTwoComponent implements OnInit {
  id: string;

  constructor() {}

  ngOnInit(): void {}
}
