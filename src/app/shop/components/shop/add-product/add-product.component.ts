import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductStore } from '../../../stores/product.store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductComponent implements OnDestroy {
  router = inject(Router);
  productStore = inject(ProductStore);
  private activatedRoute = inject(ActivatedRoute);
  fb: FormBuilder = inject(FormBuilder);

  isInEditMode = signal<boolean>(false);

  private productId = +this.activatedRoute.snapshot.params['id'];

  constructor() {
    effect(() => {
      const product = this.productStore.getProductById(this.productId);
      if (product) {
        this.addProductForm.patchValue(product);
        this.isInEditMode.set(true);
      }
    });
  }

  ngOnDestroy(): void {
    console.log('AddProductComponent destroyed');
  }

  addProductForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required, Validators.minLength(3)]],
    image: ['', [Validators.required, Validators.minLength(3)]],
  });

  handleSubmit() {
    if (this.addProductForm.valid && !this.isInEditMode()) {
      this.saveProduct();
    } else if (this.addProductForm.valid && this.isInEditMode()) {
      this.updateProduct();
    }
    this.router.navigateByUrl('/');
  }

  saveProduct() {
    const newProduct = this.buildProductFromForm();
    this.productStore.addProduct(newProduct);
  }

  updateProduct() {
    const updatedProduct = this.buildProductFromForm();
    this.productStore.updateProduct(updatedProduct);
  }

  buildProductFromForm() {
    return {
      id: this.productId || 100,
      title: this.addProductForm.value.title!,
      price: this.addProductForm.value.price!,
      description: this.addProductForm.value.description!,
      category: this.addProductForm.value.category!,
      image: this.addProductForm.value.image!,
    };
  }
}
