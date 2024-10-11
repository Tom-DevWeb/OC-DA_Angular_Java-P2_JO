import {Injectable} from '@angular/core';
import {BehaviorSubject, debounceTime, fromEvent, map} from "rxjs";

interface WindowSize {
  width: number
  height: number
}

@Injectable({
  providedIn: 'root'
})
export class ResizeChartService {

  private windowSize$ = new BehaviorSubject<WindowSize>(
    this.calculateWindowSize()
  )

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        map(() => this.calculateWindowSize()),
      )
      .subscribe(this.windowSize$)
  }

  private calculateWindowSize(): WindowSize {
    const width = window.innerWidth >= 800 ? 750 : window.innerWidth - 40
    const height = window.innerHeight >= 600 ?
      window.innerWidth <= 635 ?
        window.innerWidth : window.innerWidth / 3
      : window.innerWidth / 3
    return {width, height}
  }

  getWindowSize() {
    return this.windowSize$.asObservable()
  }
}
