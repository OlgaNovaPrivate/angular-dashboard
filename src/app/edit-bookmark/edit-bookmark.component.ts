import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { Bookmark } from '../shared/bookmark/bookmark-model/bookmark.model';
import { BookmarkService } from '../shared/bookmark/bookmark-service/bookmark.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss'],
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink],
})
export class EditBookmarkComponent implements OnInit {
  bookmark?: Bookmark;

  constructor(
    private bookmarkService: BookmarkService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const bookmarkId = paramMap.get('id');
      if (bookmarkId != null) {
        this.bookmark = this.bookmarkService.getBookmark(bookmarkId);
      }
    });
  }

  onFormSubmit(form: NgForm) {
    if (!this.bookmark) return;
    const { name, url } = form.value;

    this.bookmarkService.updateBookmark(this.bookmark?.id, {
      name,
      url: new URL(url),
    });
  }

  delete() {
    if (!this.bookmark) return;
    this.bookmarkService.deleteBookmark(this.bookmark?.id);
    this.router
      .navigate(['../'], { relativeTo: this.route })
      .then(() => {
        console.log('Navigation successful');
      })
      .catch(err => {
        console.error('Navigation error', err);
      });

    return;
  }
}
