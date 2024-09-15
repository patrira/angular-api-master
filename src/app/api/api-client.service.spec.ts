import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiClientService } from './api-client.service';
import { CacheService } from '../cache/cache.service';
import { environment } from '../../environments/environment.dev';

describe('ApiClientService', () => {
  let service: ApiClientService;
  let httpMock: HttpTestingController;
  let cacheService: jest.Mocked<CacheService>;

  beforeEach(() => {
    const cacheSpy = {
      get: jest.fn(),
      set: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiClientService,
        { provide: CacheService, useValue: cacheSpy }
      ]
    });

    service = TestBed.inject(ApiClientService);
    httpMock = TestBed.inject(HttpTestingController);
    cacheService = TestBed.inject(CacheService) as jest.Mocked<CacheService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts from API if not cached', () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }];
    cacheService.get.mockReturnValue(null);

    service.getPosts().subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);

    expect(cacheService.set).toHaveBeenCalledWith('posts', mockPosts);
  });

  it('should return cached posts if available', () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }];
    cacheService.get.mockReturnValue(mockPosts);

    service.getPosts().subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    httpMock.expectNone(`${environment.apiUrl}/posts`);
  });

  it('should handle error when fetching posts', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    cacheService.get.mockReturnValue(null);

    service.getPosts().subscribe(
      () => fail('expected an error, not posts'),
      error => expect(error).toBe('Server Error: 500\nMessage: Internal Server Error')
    );

    const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching posts:', 'Error fetching posts');
  });

  it('should fetch post by id', () => {
    const mockPost = { id: 1, title: 'Test Post' };

    service.getPostById(1).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  it('should create a new post', () => {
    const newPost = { title: 'New Post' };
    const mockResponse = { id: 1, ...newPost };

    service.createPost(newPost).subscribe(post => {
      expect(post).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should update a post', () => {
    const updatedPost = { id: 1, title: 'Updated Post' };

    service.updatePost(1, updatedPost).subscribe(post => {
      expect(post).toEqual(updatedPost);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPost);
  });

  it('should delete a post', () => {
    service.deletePost(1).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should handle error when creating a post', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const newPost = { title: 'New Post' };

    service.createPost(newPost).subscribe(
      () => fail('expected an error, not post'),
      error => expect(error).toBe('Server Error: 500\nMessage: Internal Server Error')
    );

    const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });

    expect(consoleSpy).toHaveBeenCalledWith('Error creating post:', 'Error creating post');
  });

  it('should handle error when updating a post', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const updatedPost = { id: 1, title: 'Updated Post' };

    service.updatePost(1, updatedPost).subscribe(
      () => fail('expected an error, not post'),
      error => expect(error).toBe('Server Error: 500\nMessage: Internal Server Error')
    );

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/1`);
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });

    expect(consoleSpy).toHaveBeenCalledWith('Error updating post:', 'Error updating post');
  });

  it('should handle error when deleting a post', () => {
    const consoleSpy = jest.spyOn(console, 'error');

    service.deletePost(1).subscribe(
      () => fail('expected an error, not response'),
      error => expect(error).toBe('Server Error: 500\nMessage: Internal Server Error')
    );

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/1`);
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });

    expect(consoleSpy).toHaveBeenCalledWith('Error deleting post:', 'Error deleting post');
  });
});
