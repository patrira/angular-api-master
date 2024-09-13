import { Component } from '@angular/core';
import { ApiClientService } from '../../api/api-client.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  newPost = {
    title: '',
    body: '',
    userId: 1  // Mock user
  };

  constructor(private apiClient: ApiClientService) {}

  // Create a new post
  createPost(): void {
    this.apiClient.createPost(this.newPost).subscribe(
      () => {
        alert('Post created successfully');
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }
}
