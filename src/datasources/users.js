import { RESTDataSource } from "@apollo/datasource-rest";

export class UsersAPI extends RESTDataSource {
  baseURL = 'https://jsonplaceholder.typicode.com/'

  async getAll() {
    return this.get('users')
  }

  async getById(id) {
    return this.get(`users/${id}`)
  }
}