import { RESTDataSource } from "@apollo/datasource-rest";

export class PostsAPI extends RESTDataSource {
  constructor() {
    super()

    this.baseURL = 'https://jsonplaceholder.typicode.com/'
  }

  async getAll() {
    return this.get('posts')
  }

  async updatePost(id, data) {
    try {
      const resp = await this.patch(`posts/${id}`, {
        body: data
      })

      return resp
    } catch (e) {
      console.log('updatePost', e)
    }
  }
}