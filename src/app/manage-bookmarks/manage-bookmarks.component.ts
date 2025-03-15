import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Bookmark } from '../shared/bookmark/bookmark-model/bookmark.model';
import { BookmarkService } from '../shared/bookmark/bookmark-service/bookmark.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-manage-bookmarks',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgForOf, RouterOutlet],
  templateUrl: './manage-bookmarks.component.html',
  styleUrl: './manage-bookmarks.component.scss',
})
export class ManageBookmarksComponent implements OnInit {
  bookmarks?: Bookmark[];

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.getBookmarks();
  }
}
