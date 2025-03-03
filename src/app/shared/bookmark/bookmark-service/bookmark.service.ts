import { Bookmark } from '../bookmark-model/bookmark.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  bookmarks: Bookmark[] = [
    new Bookmark('Google', 'https://google.com'),
    new Bookmark('Youtube', 'https://youtube.com'),
    new Bookmark('Twitch', 'https://twitch.com'),
    new Bookmark('Tiktok', 'https://tiktok.com'),
  ];

  constructor() {}

  getBookmarks() {
    return this.bookmarks;
  }

  getBookmark(id: string) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);
  }

  updateBookmark(id: string, updateFields: Partial<Bookmark>) {
    const bookmark = this.getBookmark(id);
    bookmark
      ? Object.assign(bookmark, updateFields)
      : console.error(`Note with id ${id} not found`);
  }

  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex(b => b.id !== id);
    if (bookmarkIndex == -1) return;
    this.bookmarks.splice(bookmarkIndex, 1);
  }
}
