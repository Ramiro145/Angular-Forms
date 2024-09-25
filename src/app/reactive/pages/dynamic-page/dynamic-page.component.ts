import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {



  public myForm:FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', [Validators.required, Validators.minLength(3)]],
      ['Death Stranding', [Validators.required, Validators.minLength(3)]]
    ])
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)])

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }


  isValidNew():boolean{
    return this.newFavorite.touched;
  }

  isValidField(field:string): boolean{
    return this.myForm.controls[field] && this.myForm.controls[field].touched;
  }

  isValidFieldInArray(formArray:FormArray, index:number){
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }


  getArrayFieldError(formArray:FormArray, index:number): string | null{

    if(!formArray.controls[index]) return null;

    const errors = formArray.controls[index].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ) {
        case 'required':
          return 'Este campo se requiere'
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`
        case 'min':
          return `La cantidad debe ser de minimo ${errors['min'].min}`
      }
    }
    return null;
  }

  getNewControlError(): string | null {
    if(!this.newFavorite) return null;

    const errors = this.newFavorite.errors || {};

    for (const key of Object.keys(errors)) {
          switch( key ) {
            case 'required':
              return 'Este campo es requerido'
            case 'minlength':
              return `Minimo ${errors['minlength'].requiredLength} caracteres`
            case 'min':
              return `La cantidad debe ser de minimo ${errors['min'].min}`
          }
        }
        return null;

  }

  getFieldError(field:string): string | null{

    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};


    for (const key of Object.keys(errors)) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`
        case 'min':
          return `La cantidad debe ser de minimo ${errors['min'].min}`
      }
    }
    return null;
  }

  onAddToFavorites():void{
    if(this.newFavorite.invalid) return

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control(newGame, [Validators.required, Validators.minLength(3)])
    )

    this.newFavorite.reset()
  }

  onDeleteFvorite(index:number):void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit():void {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched()
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset()
  }

  constructor(private fb:FormBuilder){}


}
