import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.myForm.reset(this.person)
  }

  public myForm:FormGroup = this.fb.group({
    gender:['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });


  public person = {
    gender:'M',
    wantNotifications:false
  }


  isInvalidField(field:string): boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }


  getFieldError(field:string): string | null{

    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {

        switch(key){
          case 'required':
            return 'El campo es requerido';
        }
    }

    return null;
  }

  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    //removemos termsAndConditions y solo se usaran las demas propiedades
    const {termsAndConditions, ...newPerson} = this.myForm.value;

    this.person = newPerson

    console.log(this.person);
  }

}
