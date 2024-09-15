import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ApiClientService } from '../../api/api-client.service';
import { PostDetailComponent } from './post-detail.component';
import { ParamMap } from '@angular/router';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let apiClientService: jest.Mocked<ApiClientService>;
  let router: jest.Mocked<Router>;

  const mockParamMap: ParamMap = {
    has: jest.fn().mockReturnValue(true),
    get: jest.fn().mockReturnValue('1'),
    getAll: jest.fn().mockReturnValue(['1']),
    keys: []
  };

  const activatedRoute = {
    snapshot: {
      paramMap: mockParamMap
    }
  };

  beforeEach(async () => {
    const apiClientSpy = {
      getPostById: jest.fn(),
      updatePost: jest.fn(),
      deletePost: jest.fn()
    };
    const routerSpy = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [
        { provide: ApiClientService, useValue: apiClientSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    apiClientService = TestBed.inject(ApiClientService) as jest.Mocked<ApiClientService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch post details on init', () => {
    const mockPost = { id: 1, title: 'Test Post' };
    apiClientService.getPostById.mockReturnValue(of(mockPost));

    component.ngOnInit();

    expect(apiClientService.getPostById).toHaveBeenCalledWith(1);
    expect(component.post).toEqual(mockPost);
  });

  it('should handle error when fetching post details', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    apiClientService.getPostById.mockReturnValue(throwError('Error fetching post details'));

    component.ngOnInit();

    expect(apiClientService.getPostById).toHaveBeenCalledWith(1);
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching post details:', 'Error fetching post details');
  });

  it('should toggle edit mode', () => {
    component.toggleEdit();
    expect(component.isEditing).toBe(true);

    component.toggleEdit();
    expect(component.isEditing).toBe(false);
  });

  it('should update post successfully', () => {
    apiClientService.updatePost.mockReturnValue(of({}));

    window.alert = jest.fn();  // Mock alert

    component.updatePost();

    expect(apiClientService.updatePost).toHaveBeenCalledWith(1, component.post);
    expect(window.alert).toHaveBeenCalledWith('Post updated successfully');
    expect(component.isEditing).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/posts']);
  });

  it('should handle error when updating post', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    apiClientService.updatePost.mockReturnValue(throwError('Error updating post'));

    component.updatePost();

    expect(apiClientService.updatePost).toHaveBeenCalledWith(1, component.post);
    expect(consoleSpy).toHaveBeenCalledWith('Error updating post:', 'Error updating post');
  });

  it('should delete post successfully', () => {
    apiClientService.deletePost.mockReturnValue(of({}));

    window.alert = jest.fn();  // Mock alert

    component.deletePost();

    expect(apiClientService.deletePost).toHaveBeenCalledWith(1);
    expect(window.alert).toHaveBeenCalledWith('Post deleted successfully');
    expect(router.navigate).toHaveBeenCalledWith(['/posts']);
  });

  it('should handle error when deleting post', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    apiClientService.deletePost.mockReturnValue(throwError('Error deleting post'));

    component.deletePost();

    expect(apiClientService.deletePost).toHaveBeenCalledWith(1);
    expect(consoleSpy).toHaveBeenCalledWith('Error deleting post:', 'Error deleting post');
  });

  it('should cancel edit and navigate to posts', () => {
    component.cancelEdit();

    expect(component.isEditing).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/posts']);
  });
});
