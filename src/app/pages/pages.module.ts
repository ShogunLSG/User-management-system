import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { BaseDashboardComponent } from './base-dashboard/base-dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LogInComponent,
    RegisterComponent,
    BaseDashboardComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    RouterModule
  ],


})
export class PagesModule { }
