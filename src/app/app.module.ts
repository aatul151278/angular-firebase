import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/compat/functions';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { MatGridListModule } from '@angular/material/grid-list';
import { CKEditorModule } from 'ckeditor4-angular';

import { SignInComponent } from './page/sign-in/sign-in.component';
import { NavBarComponent } from './page/nav-bar/nav-bar.component';
import { ProductComponent } from './page/product/product.component';
import { ProfileComponent } from './page/profile/profile.component';
import { EmployeeComponent } from './page/employee/employee.component';
import { CkeditorPageComponent } from './page/ckeditor-page/ckeditor-page.component';
import { CustomStarRatingComponent } from './components/custom-star-rating/custom-star-rating.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    NavBarComponent,
    ProductComponent,
    ProfileComponent,
    EmployeeComponent,
    CkeditorPageComponent,
    CustomStarRatingComponent,

  ],
  imports: [
    NgxUiLoaderModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    LayoutModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatGridListModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule,
    CKEditorModule
  ],
  providers: [{
    provide: REGION, useValue: "us-central1"
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
