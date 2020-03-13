import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-three',
  templateUrl: './component-three.component.html',
  styleUrls: ['./component-three.component.sass']
})
export class ComponentThreeComponent implements OnInit {
  id: string;

  constructor() {}

  ngOnInit(): void {}
}
