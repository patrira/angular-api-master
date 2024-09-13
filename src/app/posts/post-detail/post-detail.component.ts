import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService } from '../../api/api-client.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: any = {};
  postId: number;

  constructor(
    private route: ActivatedRoute,
    private apiClient: ApiClientService
  ) {
    this.postId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getPostDetail();
  }

  // Fetch single post by ID
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

  // Update post
  updatePost(): void {
    this.apiClient.updatePost(this.postId, this.post).subscribe(
      () => {
        alert('Post updated successfully');
      },
      (error) => {
        console.error('Error updating post:', error);
      }
    );
  }
}
