import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  results: any;
  searchQuery: any;
  routeSub: any;
  searchSub: any;

  constructor(private musicData: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe(params => {
      this.searchQuery = params.q;
      this.searchSub = this.musicData.searchArtists(this.searchQuery).subscribe(data => this.results = data.artists.items.filter(artist => artist.images[0]));
    });
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
    this.routeSub.unsubscribe();
  }
}
