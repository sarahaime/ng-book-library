import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalPages correctly', () => {
    component.totalItems = 40;
    component.pageSize = 6;
    expect(component.totalPages).toBe(7);
  });

  it('should generate correct pageIndexes', () => {
    component.totalItems = 20;
    component.pageSize = 5;
    expect(component.pageIndexes).toEqual([1, 2, 3, 4]);
  });

  it('should emit pageChanged when goToPage is called with valid page', () => {
    spyOn(component.pageChanged, 'emit');
    component.totalItems = 30;
    component.pageSize = 6;
    component.currentPage = 1;
    component.goToPage(4);
    expect(component.pageChanged.emit).toHaveBeenCalledWith(4);
  });

  it('should not emit pageChanged for invalid/disabled pages', () => {
    spyOn(component.pageChanged, 'emit');
    component.totalItems = 10;
    component.pageSize = 5;
    component.currentPage = 1;
    component.goToPage(0); // below range
    component.goToPage(3); // above range
    component.goToPage(1); // current page
    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('should call goToPage with correct page when page number button is clicked', () => {
    component.totalItems = 15;
    component.pageSize = 5;
    component.currentPage = 1;
    fixture.detectChanges();
    spyOn(component, 'goToPage').and.callThrough();
    const pageButtons = fixture.debugElement.queryAll(By.css('.page-item button.page-link'));
    pageButtons[2].nativeElement.click(); // click page 2
    expect(component.goToPage).toHaveBeenCalledWith(2);
  });

  it('should call goToPage with correct page when next/prev is clicked', () => {
    component.totalItems = 15;
    component.pageSize = 5;
    component.currentPage = 2;
    fixture.detectChanges();
    spyOn(component, 'goToPage').and.callThrough();
    const pageButtons = fixture.debugElement.queryAll(By.css('.page-item button.page-link'));
    // click prev button
    pageButtons[0].nativeElement.click();
    expect(component.goToPage).toHaveBeenCalledWith(1);
    // click next button
    pageButtons[pageButtons.length - 1].nativeElement.click();
    expect(component.goToPage).toHaveBeenCalledWith(3);
  });
});
