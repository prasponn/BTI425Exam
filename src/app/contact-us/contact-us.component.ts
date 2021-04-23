import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  changeClass(field: NgModel) {
    if (field.untouched) return 'form-control';
    else {
      if (field.valid) return 'form-control is-valid';
      else return 'form-control is-invalid';
    }
  }

  onSubmit(loginForm: NgForm) {
    let errmsg: ValidationErrors = [];
    const controls = loginForm.controls;
    Object.keys(controls).forEach((key) => {
      const validError: ValidationErrors = controls[key].errors;
      if (validError) {
        Object.keys(validError).forEach((err) => {
          errmsg.push({
            field: key,
            error: err,
            value: validError[err],
          });
        });
      }
    });

    const errorMsg = this.displayerrors(errmsg);
    if (errmsg.length != 0) {
      alert('Cannot Submit. Check all fields. \n' + errorMsg);
    } else {
      alert('Sucessfully Submitted. \n');
    }
  }

  displayerrors(errors: ValidationErrors) {
    let msg = '';
    if (errors) {
      errors.forEach((element) => {
        switch (element.error) {
          case 'required':
            msg += element.field + ' is ' + element.error + '\n';
            break;
        }
      });
    }
    return msg;
  }
}
