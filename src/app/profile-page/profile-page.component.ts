import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Represents a user in the system.
 * @interface
 */
type User = { _id?: string, Username?: string, Password?: string, Email?: string, FavoriteMovies?: [] }

/**
 * Component for managing user profiles and favorite movies.
 */
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  /**
   * The user object representing the current user.
   */
  user: User = {}; // Initialize an empty user object

  /**
   * An array to store the user's favorite movies.
   */
  favoriteMovies: any[] = [];

  /**
   * Input data for user profile (username, password, email).
   */
  @Input() userData = { Username: '', Password: '', Email: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    /**
     * Gets the user data from local storage.
     * @returns The user data as a User object.
     */
    const user = this.getUser();

    if (!user._id) {
      // If the user ID is not available, redirect to the 'welcome' page
      this.router.navigate(['welcome']);
      return;
    }

    this.user = user;
    this.userData = {
      Username: user.Username || "",
      Email: user.Email || "",
      Password: "",
    };
    
    if (this.user && this.user.Username) {
      // Fetch and display the user's favorite movies
      this.fetchFavoriteMovies();
    }
  }

  /**
   * Fetches and updates the list of favorite movies for the current user.
   */
  fetchFavoriteMovies(): void {
    const username = this.user?.Username;
  
    if (!username) {
      return; // Username is undefined, don't make the API call
    }
  
    this.fetchApiData.getFavoriteMovies(username).subscribe((movies) => {
      this.favoriteMovies = movies;
    });
  }
  
  /**
   * Deletes a movie from the user's list of favorite movies.
   * @param movieId The ID of the movie to delete from favorites.
   */
  deleteFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(() => {
      // Update the favoriteMovies array after successful deletion
      this.favoriteMovies = this.favoriteMovies.filter(movie => movie._id !== movieId);
      this.snackBar.open('Movie removed from favorites!', 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * Retrieves the user data from local storage.
   * @returns The user data as a User object.
   */
  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  /**
   * Updates the user's profile information.
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result))
      this.user = result;
      this.snackBar.open('User updated!', 'OK', {
        duration: 2000
      });
    });
  }
}
