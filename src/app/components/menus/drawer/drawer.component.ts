import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MenuController, IonMenu } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Layout } from 'src/app/models/ngx-store/Layout.model';
import * as LayoutActions from '../../../ngx-store/actions/layout.action';


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit, AfterViewInit {

    @ViewChild('menu', { static: false }) menu: IonMenu;

    menuOpen = false;

    constructor(private menuController: MenuController, private store: Store<AppState>) {
        store.select('layout').subscribe((layout) => {
            // console.log(`layout: ${layout}`);
            if (layout === null || layout === undefined) { return; }
            this.menuOpen = layout.menuOpen;

        });
    }

    ngOnInit() {}

    ngAfterViewInit() {
        // Manually open/close menu (to see if it works in ngrx dev-tool)
        this.store.select('layout').subscribe((layout) => {
            // console.log(`layout: ${layout}`);
            if (layout === null || layout === undefined) { return; }
            this.menu.setOpen(layout.menuOpen);
        });
    }

    onClickItem() {
        this.menuController.close();
    }

    openMenu() {
        this.store.dispatch(new LayoutActions.OpenMenu());
        console.log('Menu opened');
    }

    closeMenu() {
        this.store.dispatch(new LayoutActions.CloseMenu());
        console.log('Menu closed');
    }
}
