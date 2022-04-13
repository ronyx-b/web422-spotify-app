import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service'

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  favourites: Array<any>;
  favouritesSub: any;
  removeFavouritesSub: any;

  constructor(private musicData: MusicDataService) { }

  removeFromFavourites(id): void {
    this.removeFavouritesSub = this.musicData.removeFromFavourites(id).subscribe(data => this.favourites = data.tracks);
  }

  ngOnInit(): void {
    this.favouritesSub = this.musicData.getFavourites().subscribe(data => this.favourites = data.tracks);
  }

  ngOnDestroy(): void {
    this.favouritesSub.unsubscribe();
    this.removeFavouritesSub?.unsubscribe();
  }

}
