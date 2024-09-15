import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ApiClientService } from '../../api/api-client.service';
import { PostCreateComponent } from './post-create.component';

describe('PostCreateComponent', () => {
  let component: PostCreateComponent;
  let fixture: ComponentFixture<PostCreateComponent>;
  let apiClientService: jest.Mocked<ApiClientService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const apiClientSpy = {
      createPost: jest.fn()
    };
    const routerSpy = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PostCreateComponent],
      providers: [
        { provide: ApiClientService, useValue: apiClientSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostCreateComponent);
    component = fixture.componentInstance;
    apiClientService = TestBed.inject(ApiClientService) as jest.Mocked<ApiClientService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a post successfully', () => {
    apiClientService.createPost.mockReturnValue(of({}));

    window.alert = jest.fn();  // Mock alert

    component.createPost();

    expect(apiClientService.createPost).toHaveBeenCalledWith(component.newPost);
    expect(window.alert).toHaveBeenCalledWith('Post created successfully');
    expect(router.navigate).toHaveBeenCalledWith(['/posts']);
  });

  it('should handle error when creating a post', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    apiClientService.createPost.mockReturnValue(throwError('Error creating post'));

    component.createPost();

    expect(apiClientService.createPost).toHaveBeenCalledWith(component.newPost);
    expect(consoleSpy).toHaveBeenCalledWith('Error creating post:', 'Error creating post');
  });
});
