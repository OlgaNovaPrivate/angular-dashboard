import { Note } from './note.model';

describe('Note', () => {
  it('should create an instance', () => {
    const note = new Note('Title', 'Content');
    expect(note).toBeTruthy();
  });
});
