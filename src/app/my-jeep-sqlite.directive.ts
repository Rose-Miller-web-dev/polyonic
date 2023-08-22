import { Directive, ElementRef, OnInit } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite'; // Adjust the import as per your setup
import { Capacitor } from '@capacitor/core';
import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite';

@Directive({
  selector: '[appMyJeepSqlite]'
})

export class MyJeepSqliteDirective implements OnInit {

  constructor(private el: ElementRef) {}

  async ngOnInit() {

    try {

      const platform = Capacitor.getPlatform();

      if (platform === 'web') {

        const sqlite = new SQLiteConnection(CapacitorSQLite);

        const jeepSqliteEl = document.createElement('jeep-sqlite') as any;

        this.el.nativeElement.appendChild(jeepSqliteEl);

        await customElements.whenDefined('jeep-sqlite');

        console.log(`after customElements.whenDefined`);

        await sqlite.initWebStore();

        console.log(`after initWebStore`);

      }

    } catch (e) {

      console.log(e);

    }

  }

}