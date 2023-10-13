const AddCommentOnThreadUseCase = require("../../../../Applications/use_case/AddCommentOnThreadUseCase");
const DeleteCommentOnThreadUseCase = require("../../../../Applications/use_case/DeleteCommentOnThreadUseCase");

class CommentsHandler {
  constructor(container) {
    this._container = container;

    this.postCommentOnThreadHandler = this.postCommentOnThreadHandler.bind(this);
    this.deleteCommentOnThreadHandler = this.deleteCommentOnThreadHandler.bind(this);
  }

  async postCommentOnThreadHandler(request, h) {
    const addCommentOnThreadUseCase = this._container.getInstance(AddCommentOnThreadUseCase.name);
    const { id: owner } = request.auth.credentials;
    const thread = request.params.threadId;
    const useCasePayload = {
      content: request.payload.content,
      thread,
      owner
    }
    const addedComment = await addCommentOnThreadUseCase.execute(useCasePayload);

    const response = h.response({
      status: 'success',
      data: {
        addedComment
      }
    });
    response.code(201);
    return response;
  }

  async deleteCommentOnThreadHandler(request, h) {
    const deleteCommentOnThreadUseCase = this._container.getInstance(DeleteCommentOnThreadUseCase.name);
    const { id: owner } = request.auth.credentials;
    const thread = request.params.threadId;
    const comment = request.params.commentId;
    const useCasePayload = {
      thread,
      comment,
      owner
    }
    await deleteCommentOnThreadUseCase.execute(useCasePayload);

    const response = h.response({
      status: 'success'
    });
    return response;
  }
}

module.exports = CommentsHandler;