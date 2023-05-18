import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    LogInComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ComponentsModule,
    RouterModule
  ]
})
export class PagesModule { }
