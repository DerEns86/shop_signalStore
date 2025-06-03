import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Product } from '../../../../models/product.model';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let products: Product[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
      imports: [ProductListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    fixture.componentRef.setInput('products', products);
    await fixture.whenStable();
    component = fixture.componentInstance;
    fixture.detectChanges();

    products = [
      {
        id: 1,
        title: 'Test',
        price: 10,
        description: '',
        category: '',
        image: '',
      },
      {
        id: 2,
        title: 'Test 2',
        price: 20,
        description: '',
        category: '',
        image: '',
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
