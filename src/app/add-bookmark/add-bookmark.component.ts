import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormsModule,
  NgForm,
  ValidatorFn,
} from '@angular/forms';
import { BookmarkService } from '../shared/bookmark/bookmark-service/bookmark.service';
import { Bookmark } from '../shared/bookmark/bookmark-model/bookmark.model';
import { NotificationService } from '../shared/notification/notification-service/notification.service';

@Component({
  selector: 'app-add-bookmark',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-bookmark.component.html',
  styleUrl: './add-bookmark.component.scss',
})
export class AddBookmarkComponent implements OnInit {
  constructor(
    private bookmarkService: BookmarkService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  // Custom validator function:

  validUrlValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return null;

      try {
        const normalizedUrl = this.normalizeUrl(value);
        const urlObject = new URL(normalizedUrl);

        if (!urlObject.hostname.includes('.')) {
          return { invalidUrl: true };
        }

        return null; // valid
      } catch {
        return { invalidUrl: true };
      }
    };
  }

  private normalizeUrl(url: string): string {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = url.replace(/^www\./, '');
      url = 'https://' + url;
    }
    return url;
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      this.notificationService.show('Invalid form submission!');
      return;
    }

    const { name, url } = form.value;
    const normalizedUrl = this.normalizeUrl(url);

    // Run validator manually (a temporary solution that needs testing badly)
    const urlControlMock = { value: url } as AbstractControl;
    const validationResult = this.validUrlValidator()(urlControlMock);

    if (validationResult) {
      this.notificationService.show('Invalid URL format!');
      return;
    }

    const bookmark = new Bookmark(name, normalizedUrl);
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
