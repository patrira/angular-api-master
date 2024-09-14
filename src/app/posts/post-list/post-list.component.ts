import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../api/api-client.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  paginatedPosts: any[] = [];
  totalPosts = 0;
  currentPage = 1;
  postsPerPage = 10;

  constructor(private apiClient: ApiClientService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.apiClient.getPosts().subscribe(
      (data: any[]) => {
        this.posts = data;
        this.totalPosts = data.length;
        this.updatePaginatedPosts();
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedPosts();
  }

  updatePaginatedPosts(): void {
    const start = (this.currentPage - 1) * this.postsPerPage;
    const end = start + this.postsPerPage;
    this.paginatedPosts = this.posts.slice(start, end);
  }
}
