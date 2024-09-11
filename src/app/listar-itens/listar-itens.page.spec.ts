import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarItensPage } from './listar-itens.page';

describe('ListarItensPage', () => {
  let component: ListarItensPage;
  let fixture: ComponentFixture<ListarItensPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarItensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
