const Post = require("./post")

class Author {
  constructor(name) {
    this.name = name
    this.posts = []
  }

  writePost(title, body) {
    const post = new Post(title, body, this)//this refere-se ao objeto específico da classe Author que está realizando essa ação. Por exemplo, se você tiver um autor chamado john, e você chamar john.writePost(...), dentro do método writePost, this será a instância john.
    this.posts.push(post)
    return post
  }
}

module.exports = Author