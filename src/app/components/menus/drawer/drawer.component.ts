import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit {

    constructor(private menuController: MenuController) { }

    ngOnInit() {}

    onClickItem() {
        this.menuController.close();
    }
}
