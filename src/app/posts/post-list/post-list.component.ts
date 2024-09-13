import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../api/api-client.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  currentPage = 1;
  postsPerPage = 10;
  totalPosts = 0;

  constructor(private apiClient: ApiClientService) {}

  ngOnInit(): void {
    this.fetchPosts(this.currentPage);
  }

  // Fetch paginated posts
  fetchPosts(page: number): void {
    const start = (page - 1) * this.postsPerPage;
    this.apiClient.getPosts().subscribe(
      (data: any[]) => {
        this.totalPosts = data.length;
        this.posts = data.slice(start, start + this.postsPerPage);  
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  // Handle page change
  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.fetchPosts(newPage);
  }
}
