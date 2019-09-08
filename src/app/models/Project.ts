import { SafeUrl } from '@angular/platform-browser';

export default class Project {
  _id: string;
  name: string;
  description: string;
  imgpath: string;
  image: SafeUrl;
  createdAt: string;
}
