import {Component, OnInit} from '@angular/core';
import {map, Observable} from 'rxjs';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";
import {Color, PieChartModule, ScaleType} from "@swimlane/ngx-charts";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  title!: string
  indicators!: { title: string; indicator: Observable<number> }[]

  public olympics$!: Observable<Olympic[]>
  public pieChartData$!: Observable<PieChartModule[]>
  viewWitdh!: number
  viewHeight!: number

  constructor(
    private olympicService: OlympicService,
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics()

    this.title = 'Medals per Country'
    this.indicators = [
      {title: 'Number of JOs', indicator: this.getNumberJOs()},
      {title: 'Number of countries', indicator: this.getNumberOfCountries()},
    ]

    this.pieChartData$ = this.formatDataForChart()
  }


  getNumberJOs() {
    return this.olympics$.pipe(
      map((olympics) => {
        const listCities = new Set<string>()
        olympics.forEach((olympic) =>
          olympic.participations.forEach((participation) => {
            listCities.add(participation.city)
          })
        )
        return listCities.size
      })
    )
  }

  getNumberOfCountries() {
    return this.olympics$.pipe(map((olympics) => olympics.length))
  }

  formatDataForChart() {
    return this.olympics$.pipe(
      map((olympics) =>
        olympics.map((olympic) => ({
          name: olympic.country,
          value: olympic.participations.reduce(
            (acc, participation) => acc + participation.medalsCount,
            0,
          ),
        })),
      )
    )
  }

  onChartClick(data: any) {
    this.router.navigateByUrl(`details/${data.name}`).catch((err) => {
      console.error('Navigation error: ' + err)
    })
  }

  public colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#956065', '#b8cbe7', '#89a1db', '#793d52', '#9780a1']
  }
}
