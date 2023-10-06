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
    // Check if user is authenticated (user exists in localStorage)
    const user = localStorage.getItem('user');
    
    if (!user) {
      // Redirect to the 'welcome' page if user is not authenticated
      this.router.navigate(['welcome']);
      return;
    }
    
    // Fetch and display the list of movies
    this.getMovies();
  }

  /**
   * Fetches all movies and updates the 'movies' property with the response.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  /**
   * Opens a dialog to display movie details.
   * @param movie The movie object to display in the dialog.
   * @param dialogType The type of dialog ('genre', 'director', or 'synopsis').
   */
  openMovieDialog(movie: any, dialogType: 'genre' | 'director' | 'synopsis'): void {
    const dialogRef = this.dialog.open(MovieDialogComponent, {
      width: '500px',
      data: { movie, dialogType },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /**
   * Checks if a movie is in the user's favorites.
   * @param id The ID of the movie to check.
   * @returns True if the movie is a favorite, false otherwise.
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

  /**
   * Removes a movie from the user's favorites and shows a success snackbar.
   * @param id The ID of the movie to remove from favorites.
   */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Removed from favorites', 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * Adds a movie to the user's favorites and shows a success snackbar.
   * @param id The ID of the movie to add to favorites.
   */
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Added to favorites', 'OK', {
        duration: 2000
      });
    });
  }
}
