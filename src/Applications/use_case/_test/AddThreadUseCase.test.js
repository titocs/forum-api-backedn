const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const AddThread = require("../../../Domains/threads/entities/AddThread");
const AddedThread = require("../../../Domains/threads/entities/AddedThread");
const AddThreadUseCase = require("../AddThreadUseCase");

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'sebuah thread',
      body: 'Ini adalah contoh thread',
      owner: 'user-123',
    }

    const expectedAddedThread = new AddedThread({
      id: 'thread-h_123',
      title: useCasePayload.title,
      body: useCasePayload.body,
      owner: useCasePayload.owner
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.addThread = jest.fn().mockImplementation(() => Promise.resolve(new AddedThread({
      id: 'thread-h_123',
      title: useCasePayload.title,
      body: useCasePayload.body,
      owner: useCasePayload.owner
    })));

    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository
    })

    // Execute
    const addedThread = await getThreadUseCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(expectedAddedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread({
      title: useCasePayload.title,
      body: useCasePayload.body,
      owner: useCasePayload.owner
    }))
  })
})