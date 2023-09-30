import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

    ngOnInit(): void {
      const user = localStorage.getItem('user');
  
      if (!user) {
        this.router.navigate(['welcome']);
        return;
      }
  
      this.getMovies();
    }

    /**
   * calls the getAllMovies api and sets the value
   * @param id the movie id
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  // Function to open the movie dialog
  openMovieDialog(movie: any, dialogType: 'genre' | 'director' | 'synopsis'): void {
    const dialogRef = this.dialog.open(MovieDialogComponent, {
      width: '500px',
      data: { movie, dialogType },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id)
  }

  /**
   * calls the deleteFavoriteMovie api and shows the snackbar if successful
   * @param id the movie id
   */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('removed from favorites', 'OK', {
        duration: 2000
      })
    });
  }

  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('added to favorites', 'OK', {
        duration: 2000
      })
    });
  }
}