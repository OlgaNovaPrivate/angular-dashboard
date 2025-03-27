import { Bookmark } from '../bookmark-model/bookmark.model';
import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  bookmarks: Bookmark[] = [];

  storageListenSub: Subscription;

  constructor() {
    this.loadState();

    this.storageListenSub = fromEvent<StorageEvent>(
      window,
      'storage'
    ).subscribe(event => {
      if (event.key === 'bookmarks') this.loadState();
      console.log('Storage event fired!');
      console.log(event);
    });
  }

  getBookmarks() {
    return this.bookmarks;
  }

  getBookmark(id: string) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);

    this.saveState();
  }

  updateBookmark(id: string, updateFields: Partial<Bookmark>) {
    const bookmark = this.getBookmark(id);
    bookmark
      ? Object.assign(bookmark, updateFields)
      : console.error(`Note with id ${id} not found`);

    this.saveState();
  }

  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex(b => b.id !== id);
    if (bookmarkIndex == -1) return;
    this.bookmarks.splice(bookmarkIndex, 1);

    this.saveState();
  }

  saveState() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  loadState() {
    try {
      const bookmarksInStorage = localStorage.getItem('bookmarks');
      if (!bookmarksInStorage) {
        this.bookmarks = [];
        return;
      }
      const parsedBookmarks: Bookmark[] = JSON.parse(
        bookmarksInStorage,
        (key, value) => (key === 'url' ? new URL(value) : value)
      );
      this.bookmarks.push(...parsedBookmarks);
    } catch (error) {
      console.error(
        'There was an error retrieving bookmarks from local storage!',
        error
      );
      this.bookmarks = [];
    }
  }
}
