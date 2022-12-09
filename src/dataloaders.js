import DataLoader from "dataloader";

export const dataLoaders = (dataSources) => ({
  usersLoader: new DataLoader(async keys => {
    try {
      const users = await dataSources.usersAPI.getAll();

      // Map it or alternatively use users.find(...)
      const userMap = {}

      users.forEach(user => {
        userMap[user.id] = user
      })

      return keys.map(key => userMap[key])
    } catch (e) {
      console.log('usersLoader', e)
    }
  }),
  commentsLoader: new DataLoader(async keys => {
    try {
      const comments = await dataSources.commentsAPI.getAll();

      // Map it or alternatively use comments.find(...)
      const commentMap = {}

      comments.forEach(comment => {
        // Create array if needed
        if (!commentMap[comment.postId]) {
          commentMap[comment.postId] = []
        }

        commentMap[comment.postId].push(comment)
      })

      return keys.map(key => commentMap[key])
    } catch (e) {
      console.log('commentsLoader', e)
    }
  })
})