import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/api/api.service'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PostModel } from 'src/app/shared/model/model';
import { ExcelService } from 'src/app/shared/excel/excel.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = ['select', 'userId', 'id', 'title', 'body', 'detail', 'delete'];
  dataSource: MatTableDataSource<PostModel>;
  selection = new SelectionModel<PostModel>(true, []);
  public selectedData: any[] = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly excelService: ExcelService,
    private readonly router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  ngAfterViewInit() {
  }

  public getPosts(): void {
    this.apiService.getAllPosts().subscribe(data => {
      this.dataSource = new MatTableDataSource<PostModel>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public isAllSelected(): any {
    this.selectedData = [];
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    this.selection.selected.forEach(element => {
      this.selectedData.push(element);
    });
    return numSelected === numRows;
  }

  public masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  public exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.selectedData, 'post(s)-excel');
  }

  public navigateToDetail(id: number): void {
    this.router.navigate([`/post-detail/${id}`]);
  }

  public deletePost(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50vh';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'modal-common-css';

    dialogConfig.data = {
      headerText: 'Warning',
      messageText: 'Are you sure you want to delete the selected post?',
      positiveButton: 'Yes',
      negativeButton: 'No'
    };

    const dialogRef = this.dialog.open(ConfirmationModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.apiService.deletePost(id).subscribe(
            data => {
              this.snackBar.open('Post deleted sucessfully', '', {
                duration: 2000,
                panelClass: ['success-snackbar'],
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition
              });
              this.getPosts();
            },
            ((response: HttpResponse<any>) => {
              if (response.status !== 200) {
                this.snackBar.open('Server Error (Server not responding correctly)', '', {
                  duration: 2000,
                  panelClass: ['error-snackbar'],
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
              } else {
              }
            }
            ))
        } else {

        }
      }
    );
  }
}
