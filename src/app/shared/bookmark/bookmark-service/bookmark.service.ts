import { Bookmark } from '../bookmark-model/bookmark.model';
import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService implements OnDestroy {
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

  ngOnDestroy() {
    this.storageListenSub.unsubscribe();
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
    if (!bookmark) {
      console.error(`Bookmark with id ${id} not found`);
      return;
    }
    Object.assign(bookmark, updateFields);

    this.saveState();
  }

  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex(b => b.id === id);
    if (bookmarkIndex === -1) return;
    this.bookmarks.splice(bookmarkIndex, 1);

    this.saveState();
  }

  saveState() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  loadState() {
    try {
      const bookmarksInStorage = localStorage.getItem('bookmarks');
      const parsedBookmarks: Bookmark[] = bookmarksInStorage
        ? JSON.parse(bookmarksInStorage, (key, value) => {
            if (key == 'url') return new URL(value);
            return value;
          })
        : [];

      this.bookmarks.length = 0;
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
