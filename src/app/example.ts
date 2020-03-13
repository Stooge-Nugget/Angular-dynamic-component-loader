import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { NavigationService } from '@pe/ui-api';
import {
  PeOnSave,
  PeViewOrEdit,
  PurchaseDetailsPageComponent
} from 'libs/purchase-details/src/lib/pages/purchase-details-page/purchase-details-page.component';

const editors = {
  purchase: PurchaseDetailsPageComponent
};

interface ComponentConfig {
  hasSave: boolean;
}

@Component({
  selector: 'app-proxy-route',
  templateUrl: './proxy-route.component.html',
  styleUrls: ['./proxy-route.component.scss']
})
export class ProxyRouteComponent implements OnInit, AfterViewInit {
  private component;
  private componentClass;
  private id;

  componentConfig: ComponentConfig;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store,
    private navigationService: NavigationService
  ) {}

  @ViewChild('content', { read: ViewContainerRef, static: true })
  content: ViewContainerRef;

  ngOnInit() {
    this.id = this.store.selectSnapshot(state => state.router.state.edit.params.id);
    this.componentClass = editors[this.id.split('_')[0]];
    this.componentConfig = {
      hasSave: this.implementsOnSave(this.componentClass.prototype)
    };
  }

  ngAfterViewInit() {
    this.renderComponent();
  }

  renderComponent() {
    this.component = this.content.createComponent(this.getFactory(), null, this.content.injector);

    if (this.component.instance.id) {
      this.component.instance.id = this.id;
    }
    this.component.changeDetectorRef.detectChanges();
  }

  save() {
    this.component.instance.onSave();
  }

  close() {
    this.navigationService.clearEditRoute();
  }

  getFactory() {
    return this.componentFactoryResolver.resolveComponentFactory(this.componentClass);
  }

  implementsOnSave(obj: any): obj is PeOnSave {
    return 'onSave' in obj;
  }

  implementsViewOrEdit(obj: any): obj is PeViewOrEdit {
    return 'id' in obj;
  }
}
