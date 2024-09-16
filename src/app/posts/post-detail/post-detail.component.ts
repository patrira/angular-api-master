import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Import Router
import { ApiClientService } from '../../api/api-client.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: any = {};
  isEditing = false;
  postId: number;
comments: any;

  constructor(
    private route: ActivatedRoute,
    private apiClient: ApiClientService,
    private router: Router  
  ) {
    this.postId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getPostDetail();
  }

  getPostDetail(): void {
    this.apiClient.getPostById(this.postId).subscribe(
      (data) => {
        this.post = data;
      },
      (error) => {
        console.error('Error fetching post details:', error);
      }
    );
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  updatePost(): void {
    this.apiClient.updatePost(this.postId, this.post).subscribe(
      () => {
        this.isEditing = false;
        alert('Post updated successfully');
        this.router.navigate(['/posts']);  
      },
      (error) => {
        console.error('Error updating post:', error);
      }
    );
  }

  deletePost(): void {
    this.apiClient.deletePost(this.postId).subscribe(
      () => {
        alert('Post deleted successfully');
        this.router.navigate(['/posts']);  
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.router.navigate(['/posts']);  
  }
}
