import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { interval } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

export const pluginsModules = [
  CommonModule,
  RouterModule,
  MatProgressBarModule
];

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: pluginsModules,
})
export class LoaderComponent implements OnInit, OnChanges{
  @Input() progress : number = 0;
  progressLoader: number = 0;
  load(){
    this.progressLoader = 0;
    const loading$ = interval(90).pipe(
      tap(() => {
        if(this.progressLoader < 90){
          this.progressLoader += 1;
        }
        if(this.progress == 100){
          this.progressLoader = 99;
          setTimeout(()=>{
            this.progressLoader = this.progress;
          }, 500)
        }
      }),
      takeWhile(() => this.progress < 100)
    );
    loading$.subscribe();
  }
  ngOnInit(): void {
    this.load();
  }
  ngOnChanges(): void{
    this.load();
  }
}
