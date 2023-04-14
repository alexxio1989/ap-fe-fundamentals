import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addHours,addMinutes } from '../util/util';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() disable :boolean;
  @Input() minTime :string;
  @Input() maxTime :string;

  @Input() dateStart: Date;
  @Output() dateStartChange: EventEmitter<Date> = new EventEmitter<Date>();

  @Input() dateEnd: Date;
  @Output() dateEndChange: EventEmitter<Date> = new EventEmitter<Date>();

  editedStartDate : Date

  today:Date = new Date();

  constructor() { }

  ngOnInit(): void {
    this.editedStartDate = this.dateStart
  }

  onSelectDate(event : any){

    console.log("this.disable :: " + this.disable)
    console.log("event :: " + JSON.stringify(event))
    if(this.disable){
      return;
    }

    this.editedStartDate = event;
  }

  timeChange(event : string){
    let hourString = event.substring(0,event.indexOf(":"));
    let hourInt =  parseInt(hourString);
    let minutesString = event.substring(event.indexOf(":")+1,event.length);
    let minutesInt =  parseInt(minutesString);
    console.log("event :: " + event)
    console.log("hourInt event :: " + hourInt)
    console.log("minutesInt event :: " + minutesInt)
    this.editedStartDate = addHours(this.editedStartDate,hourInt);
    this.editedStartDate = addMinutes(this.editedStartDate,minutesInt);
    this.dateStartChange.emit(this.editedStartDate);
  }

}
