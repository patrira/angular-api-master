import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../../api/api-client.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: any = {};
  comments: any[] = [];
  isEditing = false;
  postId: number;

  constructor(
    private route: ActivatedRoute,
    private apiClient: ApiClientService,
    private router: Router  
  ) {
    this.postId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getPostDetail();
    this.getPostComments();
  }

  // Fetch post details
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

  // Fetch comments for this post
  getPostComments(): void {
    this.apiClient.getCommentsByPostId(this.postId).subscribe(
      (data) => {
        this.comments = data;
      },
      (error) => {
        console.error('Error fetching comments:', error);
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
