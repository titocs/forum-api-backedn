const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,
    options: {
      auth: 'forumapi_jwt',
    },
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: handler.getDetailThreadHandler
  }
  // {
  //   method: 'POST',
  //   path: '/threads/{threadId}/comments/{commentId}/replies',
  //   handler: handler.postReplyOnThreadComment
  // },
  // {
  //   method: 'DELETE',
  //   path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
  //   handler: handler.deleteReplyOnThreadComment
  // }
]);

module.exports = routes;
