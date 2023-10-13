const AddComment = require('../AddComment');

describe('a AddComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      thread: 'thread-h_123',
      owner: 'user-123',
    };

    // Action & Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      thread: 'thread-h_123',
      owner: 'user-123',
      content: true,
    };

    // Action & Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create new comment object correctly', () => {
    // Arrange
    const payload = {
      thread: 'thread-h_123',
      owner: 'user-123',
      content: 'ini komentar',
    };

    // Action & Assert
    const { content, thread, owner } = new AddComment(payload);

    expect(content).toEqual(payload.content);
    expect(thread).toEqual(payload.thread);
    expect(owner).toEqual(payload.owner);
  });
});