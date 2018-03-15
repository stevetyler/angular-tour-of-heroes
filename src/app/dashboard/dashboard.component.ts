import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})

// The class is similar to the HeroesComponent class.
// It defines a heroes array property.
// The constructor expects Angular to inject the HeroService into a private heroService property.
// The ngOnInit() lifecycle hook calls getHeroes.
// This getHeroes reduces the number of heroes displayed to four (2nd, 3rd, 4th, and 5th).
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
