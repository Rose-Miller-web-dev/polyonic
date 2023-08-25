import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnDestroy {
  ngOnInit(): void {
    //console.log("welcome to tabs")
  }

  ionViewDidEnter() {
    console.log('Page loaded, myFunction triggered.')
  }

  ngOnDestroy(): void {
    //alert("by tabs")
  }
}
