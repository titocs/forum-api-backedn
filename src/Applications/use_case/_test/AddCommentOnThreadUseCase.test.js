const CommentRepository = require("../../../Domains/comments/CommentRepository");
const AddComment = require("../../../Domains/comments/entities/AddComment");
const AddedComment = require("../../../Domains/comments/entities/AddedComment");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const AddCommentOnThreadUseCase = require("../AddCommentOnThreadUseCase");

describe('AddCommentOnThreadUseCase', () => { 
  it('should orchestrating the add comment action correctly', async () => {
    const useCasePayload = {
      thread: 'thread-h_123',
      content: 'sebuah komentar',
      owner: 'user-123',
    };

    const expectedAddedComment = new AddedComment({
      id: 'comment-_pby2_123',
      content: 'sebuah komentar',
      owner: 'user-123',
    });

    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.checkAvailabilityThread = jest.fn(() => Promise.resolve());
    mockCommentRepository.addComment = jest.fn().mockImplementation(() => Promise.resolve(expectedAddedComment));

    const getCommentUseCase = new AddCommentOnThreadUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository
    });

    const addedComment = await getCommentUseCase.execute(useCasePayload);

    expect(mockThreadRepository.checkAvailabilityThread).toBeCalledWith(useCasePayload.thread);
    expect(addedComment).toStrictEqual(expectedAddedComment);
    expect(mockCommentRepository.addComment).toBeCalledWith(new AddComment({
      thread: useCasePayload.thread,
      content: useCasePayload.content,
      owner: useCasePayload.owner
    }));
  });
});