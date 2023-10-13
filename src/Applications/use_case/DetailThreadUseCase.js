const DetailComment = require("../../Domains/comments/entities/DetailComment");
const DetailThread = require("../../Domains/threads/entities/DetailThread");

class DetailThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const { thread } = new DetailThread(useCasePayload);
    await this._threadRepository.checkAvailabilityThread(thread);
    const detailThread = await this._threadRepository.getDetailThread(thread);
    const getCommentsThread = await this._commentRepository.getCommentsThread(thread);

    detailThread.comments = new DetailComment({ comments: getCommentsThread }).comments;

    return {
      thread: detailThread,
    };
  }
}

module.exports = DetailThreadUseCase;