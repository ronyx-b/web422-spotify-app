import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

  albums: Array<object>; /* Create an "albums" property within the class */
  artist: any; /* Create an "artist" property within the class */
  private artistSub: any;
  private albumsSub: any;
  private routeSub: any;

  constructor(private musicData: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.artistSub = this.musicData.getArtistById(params.id).subscribe(artist => this.artist = artist);
      this.albumsSub = this.musicData.getAlbumsByArtistId(params.id).subscribe(data => {
        this.albums = data.items.filter((album, index, arr) => {
          return index === arr.map(mapAlbum => mapAlbum.name).indexOf(album.name);
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.artistSub.unsubscribe();
    this.albumsSub.unsubscribe();
    this.routeSub.unsubscribe();
  }
}
