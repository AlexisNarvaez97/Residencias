import { Storage } from "@ionic/storage";
import { Component, OnInit } from "@angular/core";
import { Router, RouterEvent } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"]
})
export class MenuPage implements OnInit {
  pages = [
    {
      title: "Facturas pendientes por aprobar",
      url: "/menu/facturas-pendientes"
    },
    {
      title: "Facturas aprobadas",
      url: "/menu/facturas-aprobadas"
    }
  ];

  selectedpath = "";

  constructor(
    private router: Router,
    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedpath = event.url;
    });
  }

  ngOnInit() {}

  async salir() {
    await this.storage.set("isLogged", false);
    this.storage.remove("currentUser");
    this.navCtrl.navigateRoot("/login");
  }
}
