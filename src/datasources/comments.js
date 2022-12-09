import { RESTDataSource } from "@apollo/datasource-rest";

export class CommentsAPI extends RESTDataSource {
  baseURL = 'https://jsonplaceholder.typicode.com/'

  async getAll() {
    return this.get('comments')
  }

  async getForPost(postId) {
    return this.get(`posts/${postId}/comments`)
  }
}