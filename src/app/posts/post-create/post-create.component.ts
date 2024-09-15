import { Component } from '@angular/core';
import { Router } from '@angular/router';  
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
    userId: 1  
  };

  constructor(private apiClient: ApiClientService, private router: Router) {}

  createPost(): void {
    this.apiClient.createPost(this.newPost).subscribe(
      () => {
        alert('Post created successfully');
        this.router.navigate(['/posts']);  
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }
}
