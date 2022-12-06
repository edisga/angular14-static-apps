import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Fruit } from './fruit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'frontend-fruits';
  fruits: any = [];

  fruitsForm = new FormGroup({
      id: new FormControl(0, { nonNullable: true }),
      title: new FormControl('', {nonNullable: true})
  });

  constructor(private appService: AppService) { }

  ngOnInit() {
      this.getFruits(); 
  }

  getFruits() {
          return this.appService.getFruits().subscribe((data: {}) => {
              this.fruits = data;
          })    
      } 
  
    addFruit(){
        this.appService.addFruit(this.fruitsForm.value as Fruit)
        .subscribe(fruit => {
        this.fruits.push(fruit);
        this.getFruits();
        this.fruitsForm.reset();
        });
    }
}