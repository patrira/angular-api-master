import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';


@NgModule({
  declarations: [
    PostsComponent,
   
    
    
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    
  ]
})
export class PostsModule { }
