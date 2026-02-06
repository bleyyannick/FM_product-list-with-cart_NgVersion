import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, test, expect } from 'vitest';
import { ModalOrderComponent } from './modal-order.component';
import { createMockSelectableProduct } from '../testing/fixtures/product.fixtures';

describe('ModalOrderComponent', () => {
  let component: ModalOrderComponent;
  let fixture: ComponentFixture<ModalOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOrderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('orderedItems', [
      createMockSelectableProduct({ isSelected: true, quantity: 2 }),
      createMockSelectableProduct({ isSelected: true, quantity: 1 })
    ]);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
