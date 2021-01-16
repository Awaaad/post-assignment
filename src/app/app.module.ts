import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProfileComponent } from './features/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule  } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExcelService } from './shared/excel/excel.service';
import { PostDetailComponent } from './features/post-detail/post-detail.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationModalComponent } from './shared/confirmation-modal/confirmation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfileComponent,
    PostDetailComponent,
    ConfirmationModalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatAutocompleteModule,
    MatDialogModule
  ],
  providers: [ExcelService, MatSnackBar, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }



