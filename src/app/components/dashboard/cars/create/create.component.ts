import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from 'src/app/core/models/brand.model';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  onSubmit!: boolean;
  brands!: Brand[];
  uploadedFile: any;
  img: any;
  constructor(private carService: CarService, public fb: FormBuilder, private _router: Router) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [1994, Validators.required],
      price: [1000, [Validators.required]],
      maker: ['', [Validators.required]],
      identification_number: [654, [Validators.required]],
      height: [20, [Validators.required]],
      widht: [10, [Validators.required]],
      longitude: [10, [Validators.required]],
      km: [0, [Validators.required]],
      description: ['', [Validators.required]],
    })
    this.carService.getBrands().then(data => {
      this.brands = data.results
    })
  }

  get brand(): AbstractControl {
    return this.form.get("brand")!;
  }

  get model(): AbstractControl {
    return this.form.get("model")!;
  }

  get year(): AbstractControl {
    return this.form.get("year")!;
  }

  get price(): AbstractControl {
    return this.form.get("price")!;
  }

  get maker(): AbstractControl {
    return this.form.get("maker")!;
  }

  get identification_number(): AbstractControl {
    return this.form.get("identification_number")!;
  }

  get height(): AbstractControl {
    return this.form.get("height")!;
  }

  get widht(): AbstractControl {
    return this.form.get("widht")!;
  }

  get longitude(): AbstractControl {
    return this.form.get("longitude")!;
  }

  get km(): AbstractControl {
    return this.form.get("km")!;
  }

  get description(): AbstractControl {
    return this.form.get("description")!;
  }

  objToArray(obj: any): any[] {
    const attri = obj !== null ? Object.keys(obj) : []
    if (obj !== null && obj[attri.join('')] && Array.isArray(obj[attri.join('')])) {
      return obj[attri.join('')];
    } else {
      return [];
    }
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFile = file
    }
  }

  submit(type?:string){
    this.onSubmit= true
    if(this.form.invalid){
      this.brand.markAsTouched()
      this.model.markAsTouched()
      this.year.markAsTouched()
      this.price.markAsTouched()
      this.maker.markAsTouched()
      this.identification_number.markAsTouched()
      this.height.markAsTouched()
      this.widht.markAsTouched()
      this.longitude.markAsTouched()
      this.km.markAsTouched()
      this.description.markAsTouched()
      return
    }

    
    this.form.value.brand = this.form.value.brand?.id
    this.form.value.image = this.uploadedFile
    this.form.value.specification = {
      maker: this.form.value.maker,
      identification_number: this.form.value.identification_number,
      height: this.form.value.height,
      widht: this.form.value.widht,
      longitude: this.form.value.longitude,
      km: this.form.value.km
    }
    this.carService.create(this.form.value).then(d => {
      this._router.navigateByUrl('/')
    }, error => {
      this.form.setErrors(error.error)
      this.onSubmit= false
    })
  }

}
