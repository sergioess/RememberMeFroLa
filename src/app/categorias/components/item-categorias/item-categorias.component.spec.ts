import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCategoriasComponent } from './item-categorias.component';

describe('ItemCategoriasComponent', () => {
  let component: ItemCategoriasComponent;
  let fixture: ComponentFixture<ItemCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
