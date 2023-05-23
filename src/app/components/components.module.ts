import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { RouterModule } from '@angular/router';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';




@NgModule({
  declarations: [

    UserPageComponent,
    AdminPageComponent,
    UpdateDetailsComponent,
    ConfirmationDialogComponent,
    ProfileComponent,
    UpdatePasswordComponent,

  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  exports: []
})
export class ComponentsModule { }
