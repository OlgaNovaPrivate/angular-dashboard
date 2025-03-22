import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { BookmarkService } from '../shared/bookmark/bookmark-service/bookmark.service';
import { Bookmark } from '../shared/bookmark/bookmark-model/bookmark.model';
import { NotificationService } from '../shared/notification/notification-service/notification.service';

@Component({
  selector: 'app-add-bookmark',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './add-bookmark.component.html',
  styleUrl: './add-bookmark.component.scss',
})
export class AddBookmarkComponent {
  constructor(
    private bookmarkService: BookmarkService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  onFormSubmit(form: NgForm) {
    const { name, url } = form.value;
    const bookmark = new Bookmark(name, url);
    this.bookmarkService.addBookmark(bookmark);
    this.notificationService.show('Created bookmark!');

    this.router
      .navigateByUrl('/bookmarks')
      .then(() => {
        console.log('Navigation successful');
      })
      .catch(err => {
        console.error('Navigation error', err);
      });

    return;
  }
}
