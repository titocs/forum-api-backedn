const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: handler.postCommentOnThreadHandler,
    options: {
      auth: 'forumapi_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: handler.deleteCommentOnThreadHandler,
  },
]);

module.exports = routes;