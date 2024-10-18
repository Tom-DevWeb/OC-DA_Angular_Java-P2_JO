import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderIndicator} from "../../../core/models/HeaderIndicator";
import {Observable, of, Subscription} from "rxjs";
import {Olympic} from "../../../core/models/Olympic";
import {Color, LineChartModule, ScaleType} from "@swimlane/ngx-charts";
import {OlympicService} from "../../../core/services/olympic.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ResizeChartService} from "../../../core/services/resize-chart.service";
import {HeaderComponent} from "../header/header.component";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    HeaderComponent,
    LineChartModule,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {
  title!: string
  indicators!: HeaderIndicator[]

  detailsCountry$!: Observable<Olympic>

  public lineChartData$!: Observable<LineChartModule[]>
  xAxisLabel: string = 'Dates'
  viewWitdh!: number
  viewHeight!: number
  resizeSubscription$!: Subscription

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private resizeChartService: ResizeChartService
  ) {
  }

  ngOnInit() {
    const country = this.route.snapshot.params['country']
    this.detailsCountry$ = this.olympicService.getDetailsByCountry(country)
    this.detailsCountry$.subscribe({
      next: (value) => {
        this.title = value.country
        this.indicators = [
          {
            title: 'Number of countries',
            indicator: this.getNumberOfEntries(value)
          },
          {
            title: 'Total number medals',
            indicator: this.getTotalMedals(value)
          },
          {
            title: 'Total number of athletes',
            indicator: this.getTotalAthletes(value)
          }
        ]
        this.lineChartData$ = this.formatDataForChart(value)
      },
      error: (error) => {
        console.error('Error:', error)
      },
      complete: () => {
        console.log('Observable completed')
      }
    })

    this.resizeSubscription$ = this.resizeChartService
      .getWindowSize()
      .subscribe((size) => {
        this.viewWitdh = size.width
        this.viewHeight = size.height
      })
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
  }

  getNumberOfEntries(olympic: Olympic): Observable<number> {
    return of(olympic.participations.length)
  }

  getTotalMedals(olympic: Olympic): Observable<number> {
    return of(
      olympic.participations.reduce(
        (acc, olympic) => acc + olympic.medalsCount,
        0,
      )
    )
  }

  getTotalAthletes(olympic: Olympic): Observable<number> {
    return of(
      olympic.participations.reduce(
        (acc, olympic) => acc + olympic.athleteCount,
        0,
      )
    )
  }

  formatDataForChart(olympic: Olympic): Observable<LineChartModule[]> {
    const chartData = olympic.participations.map((participation) => ({
      name: participation.year.toString(),
      value: participation.medalsCount,
    }))

    return of([{name: 'Medals', series: chartData}])
  }

  public colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#89a1db']
  }
}
