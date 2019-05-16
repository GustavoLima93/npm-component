import { NgModule } from '@angular/core';
import { AuthSiV1Component } from './auth-si-v1.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AuthSiV1Component
  ],
  imports: [   
    HttpClientModule
  ],
  exports: [
    AuthSiV1Component
  ]
})
export class AuthSiV1Module { }
