const CommentRepository = require("../../../Domains/comments/CommentRepository");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const DeleteCommentOnThreadUseCase = require("../DeleteCommentOnThreadUseCase");

describe('DeleteCommentOnThreadUseCase', () => {
  it('should throw error if use case payload not contain thread id and comment id', async () => {
    // Arrange
    const useCasePayload = {};
    const deleteCommentOnThreadUseCase = new DeleteCommentOnThreadUseCase({});

    // Action & Assert
    await expect(deleteCommentOnThreadUseCase.execute(useCasePayload)).rejects.toThrowError('DELETE_COMMENT_USE_CASE.NOT_CONTAIN_VALID_PAYLOAD');
  });

  it('should throw error if payload not string', async () => {
    // Arrange
    const useCasePayload = {
      thread: 1,
      comment: 1,
      owner: 1,
    };
    const deleteCommentOnThreadUseCase = new DeleteCommentOnThreadUseCase({});

    // Action & Assert
    await expect(deleteCommentOnThreadUseCase.execute(useCasePayload)).rejects.toThrowError('DELETE_COMMENT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      thread: 'thread-h_123',
      comment: 'comment-_pby2_123',
      owner: 'user_123',
    };
    
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.checkAvailabilityThread = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.checkAvailabilityComment = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.deleteComment = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const deleteCommentOnThreadUseCase = new DeleteCommentOnThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Act
    await deleteCommentOnThreadUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.checkAvailabilityThread)
      .toHaveBeenCalledWith(useCasePayload.thread);
    expect(mockCommentRepository.checkAvailabilityComment)
      .toHaveBeenCalledWith(useCasePayload.comment);
    expect(mockCommentRepository.verifyCommentOwner)
      .toHaveBeenCalledWith(useCasePayload.comment, useCasePayload.owner);
    expect(mockCommentRepository.deleteComment)
      .toHaveBeenCalledWith(useCasePayload.comment);
  });
});