import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  AfterViewInit,
  OnInit,
  ComponentRef,
  Type
} from '@angular/core';
import { ComponentOneComponent } from './component-one/component-one.component';
import { ComponentTwoComponent } from './component-two/component-two.component';
import { ComponentThreeComponent } from './component-three/component-three.component';

const componentTypes = {
  componentOne: ComponentOneComponent,
  componentTwo: ComponentTwoComponent,
  componentThree: ComponentThreeComponent
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('content', { read: ViewContainerRef, static: true })
  content: ViewContainerRef;

  private id: string;
  private componentClass: Type<any>;
  private component: ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.id = 'componentTwo';
  }

  ngOnInit(): void {
    this.componentClass = componentTypes[this.id];
  }

  ngAfterViewInit(): void {
    this.renderComponent();
  }

  initComponent(component: string) {
    this.id = component;
    this.componentClass = componentTypes[this.id];
    this.content.clear();
    this.renderComponent();
  }

  private renderComponent() {
    this.component = this.content.createComponent(this.getFactory(), null, this.content.injector);

    if (this.component.instance.id) {
      this.component.instance.id = this.id;
    }
    this.component.changeDetectorRef.detectChanges();
  }

  private getFactory() {
    return this.componentFactoryResolver.resolveComponentFactory(this.componentClass);
  }
}
