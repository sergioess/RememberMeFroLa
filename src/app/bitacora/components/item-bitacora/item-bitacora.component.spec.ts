import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBitacoraComponent } from './item-bitacora.component';

describe('ItemBitacoraComponent', () => {
  let component: ItemBitacoraComponent;
  let fixture: ComponentFixture<ItemBitacoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemBitacoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
