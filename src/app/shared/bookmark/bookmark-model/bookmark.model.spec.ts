import { Bookmark } from './bookmark.model';

describe('Bookmark', () => {
  it('should create an instance', () => {
    expect(new Bookmark('Sample Title', 'https://example.com')).toBeTruthy();
  });
});
