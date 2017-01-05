import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Camera, SocialSharing, SQLite } from 'ionic-native';
import { Storage } from '@ionic/storage';

declare var cordova;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // journal: { title: string, time: number, image: string } = {title:'', time:0, image:''}
  journalList = [];
  journalListByTime = [];
  public database: SQLite;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage) {
    // this.database = new SQLite();
    //     this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
    //         this.refresh();
    //     }, (error) => {
    //         console.log("ERROR: ", error);
    //     });
    this.storage.get("journal").then(
      (value) => {
        this.journalList = JSON.parse(value) || [];
      },
      (err) => console.log(err)
    )
  }
  takePhoto() {
    let	options	=	{
			quality:	100,		//	0~100,	default	50
			destinationType: Camera.DestinationType.FILE_URI,
  		sourceType:	Camera.PictureSourceType.CAMERA,
			saveToPhotoAlbum:	true//save	to	the	photo	album
		};	//	all	op1onal
    Camera.getPicture(options).then(
      (imagePath)=>{
        // this.journal.image = imagePath;
        this.alertCtrl.create({
          title: "title",
          message: "Please write the photo's title",
          inputs: [{name: 'title', placeholder: 'Write the title'}],
          buttons: [
            {text: 'Complete', handler: (data) => {
              // this.journal.title = data.title;
              // this.journal.time = Date.now();
              this.journalList.push({title: data.title, time: Date.now(), image: imagePath});
              this.journalListByTime = this.journalList.reverse();
              this.storage.set("journal", JSON.stringify(this.journalList));
              // this.add(data.title, Date.now(), imagePath)
              cordova.plugins.Keyboard.close();
              }
            }
          ]
        }).present();
      },	(err)=>{
        console.log("can't take a photo")
      }	);
  }
  remove(content){
    this.journalList.splice(this.journalList.indexOf(content), 1);
    this.storage.set("journal", JSON.stringify(this.journalList));
  }
  share(content) {
    SocialSharing.share(content.title, null, content.image, null);
  }
  // add(t, d, i) {
  //       this.database.executeSql("INSERT INTO journal (title, date, image)" + " VALUES (" + t +"," + d + "," +i +")", []).then((data) => {
  //           console.log("INSERTED: " + JSON.stringify(data));
  //       }, (error) => {
  //           console.log("ERROR: " + JSON.stringify(error.err));
  //       });
  //   }
  //
  //   refresh() {
  //       this.database.executeSql("SELECT * FROM journal", []).then((data) => {
  //           this.journalList = [];
  //           if(data.rows.length > 0) {
  //               for(var i = data.rows.length-1; i >= 0; i++) {
  //                   this.journalList.push({title: data.rows.item(i).title, date: data.rows.item(i).date, image: data.rows.item(i).image});
  //               }
  //           }
  //       }, (error) => {
  //           console.log("ERROR: " + JSON.stringify(error));
  //       });
  //   }
}
