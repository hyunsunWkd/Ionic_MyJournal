import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';
import { HomePage } from '../pages/home/home';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      // let db = new SQLite();
      //      db.openDatabase({
      //          name: "data.db",
      //          location: "default"
      //      }).then(() => {
      //          db.executeSql("CREATE TABLE IF NOT EXISTS photojournal (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, date TEXT, image TEXT)", {}).then((data) => {
      //              console.log("TABLE CREATED: ", data);
      //          }, (error) => {
      //              console.error("Unable to execute sql", error);
      //          })
      //      }, (error) => {
      //          console.error("Unable to open database", error);
      //      });
    });
  }
}
