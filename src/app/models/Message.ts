export default class Message {
  _id: string;
  title: string;
  email: string;
  content: string;
  createdAt: string;

  constructor(_id, title, email, content, createdAt) {
    this._id = _id;
    this.title = title;
    this.email = email;
    this.content = content;
    this.createdAt = createdAt;
  }
}
