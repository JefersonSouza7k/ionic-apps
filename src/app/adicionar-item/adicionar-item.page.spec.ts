import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarItemPage } from './adicionar-item.page';

describe('AdicionarItemPage', () => {
  let component: AdicionarItemPage;
  let fixture: ComponentFixture<AdicionarItemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
