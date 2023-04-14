import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() disable :boolean;

  @Input() dateStart: Date;
  @Output() dateStartChange: EventEmitter<Date> = new EventEmitter<Date>();

  @Input() dateEnd: Date;
  @Output() dateEndChange: EventEmitter<Date> = new EventEmitter<Date>();


  today:Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectDate(event : any){

    console.log("this.disable :: " + this.disable)
    console.log("event :: " + JSON.stringify(event))
    if(this.disable){
      return;
    }

    this.dateStartChange.emit(event);
  }

}
