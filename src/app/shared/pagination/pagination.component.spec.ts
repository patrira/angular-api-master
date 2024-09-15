import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total pages on changes', () => {
    component.totalItems = 50;
    component.itemsPerPage = 10;
    component.ngOnChanges();

    expect(component.totalPages).toBe(5);
  });

  it('should update visible pages on changes', () => {
    component.totalItems = 50;
    component.itemsPerPage = 10;
    component.currentPage = 3;
    component.ngOnChanges();

    expect(component.visiblePages).toEqual([1, 2, 3, 4, 5]);
  });

  it('should emit page change event', () => {
    jest.spyOn(component.pageChange, 'emit');

    component.changePage(2);

    expect(component.currentPage).toBe(2);
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should go to previous page', () => {
    component.currentPage = 3;
    component.totalPages = 5;

    component.prevPage();

    expect(component.currentPage).toBe(2);
  });

  it('should not go to previous page if on first page', () => {
    component.currentPage = 1;

    component.prevPage();

    expect(component.currentPage).toBe(1);
  });

  it('should go to next page', () => {
    component.currentPage = 3;
    component.totalPages = 5;

    component.nextPage();

    expect(component.currentPage).toBe(4);
  });

  it('should not go to next page if on last page', () => {
    component.currentPage = 5;
    component.totalPages = 5;

    component.nextPage();

    expect(component.currentPage).toBe(5);
  });

  it('should update visible pages correctly', () => {
    component.totalItems = 50;
    component.itemsPerPage = 10;
    component.currentPage = 3;
    component.updateVisiblePages();

    expect(component.visiblePages).toEqual([1, 2, 3, 4, 5]);
  });
});
