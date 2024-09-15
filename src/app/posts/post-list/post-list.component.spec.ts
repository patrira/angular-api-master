import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ApiClientService } from '../../api/api-client.service';
import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let apiClientService: jest.Mocked<ApiClientService>;

  beforeEach(async () => {
    const apiClientSpy = {
      getPosts: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      providers: [
        { provide: ApiClientService, useValue: apiClientSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    apiClientService = TestBed.inject(ApiClientService) as jest.Mocked<ApiClientService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch posts on init', () => {
    const mockPosts = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, title: `Post ${i + 1}` }));
    apiClientService.getPosts.mockReturnValue(of(mockPosts));

    component.ngOnInit();

    expect(apiClientService.getPosts).toHaveBeenCalled();
    expect(component.posts).toEqual(mockPosts);
    expect(component.totalPosts).toBe(20);
    expect(component.paginatedPosts.length).toBe(component.postsPerPage);
  });

  it('should handle error when fetching posts', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    apiClientService.getPosts.mockReturnValue(throwError('Error fetching posts'));

    component.ngOnInit();

    expect(apiClientService.getPosts).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching posts:', 'Error fetching posts');
  });

  it('should update paginated posts on page change', () => {
    const mockPosts = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, title: `Post ${i + 1}` }));
    apiClientService.getPosts.mockReturnValue(of(mockPosts));

    component.ngOnInit();
    component.onPageChange(2);

    expect(component.currentPage).toBe(2);
    expect(component.paginatedPosts.length).toBe(component.postsPerPage);
    expect(component.paginatedPosts[0].id).toBe(11);
  });

  it('should update paginated posts correctly', () => {
    const mockPosts = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, title: `Post ${i + 1}` }));
    component.posts = mockPosts;
    component.totalPosts = mockPosts.length;

    component.updatePaginatedPosts();

    expect(component.paginatedPosts.length).toBe(component.postsPerPage);
    expect(component.paginatedPosts[0].id).toBe(1);
    expect(component.paginatedPosts[component.postsPerPage - 1].id).toBe(component.postsPerPage);
  });
});
