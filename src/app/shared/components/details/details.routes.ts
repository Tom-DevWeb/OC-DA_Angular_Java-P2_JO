import {Routes} from "@angular/router";
import {DetailsComponent} from "./details.component";

export const detailsRoutes: Routes = [
  {
    path: ':country',
    component: DetailsComponent
  },
  {
    path: '',
    redirectTo: '/404', pathMatch: 'full'
  }
]
