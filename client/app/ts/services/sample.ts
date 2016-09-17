import { Injectable } from '@angular/core';
import { ApiService } from './api';
import 'rxjs/Rx';

@Injectable()
export class Sample {
  path: string = '/sample';
  constructor(private apiService: ApiService) {}

  createItem(note) {
    return this.apiService.post(this.path, note)
  }

  getItems() {
    return this.apiService.get(this.path)
  }

  deleteItem(note) {
    return this.apiService.delete(`${this.path}/${note.id}`)
  }
}