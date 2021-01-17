import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api/api.service';
import { CommentModel } from 'src/app/shared/model/model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() id: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  public displayedColumns: string[] = ['postId','id', 'name', 'email', 'body'];
  public dataSource: MatTableDataSource<CommentModel>;
  public selection = new SelectionModel<CommentModel>(true, []);
  public selectedData: any[] = [];

  public myControl = new FormControl();
  public options: any[] = [];
  public filteredOptions: Observable<string[]>;
  constructor(
    private readonly apiService: ApiService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getComments();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public getComments(): void {
    this.apiService.getPostCommentsById(this.id).subscribe(data => {
      this.dataSource = new MatTableDataSource<CommentModel>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      data.forEach(post => {
        this.options.push(post.body);
      })
      this.dataSource.filterPredicate = function (data, event: string): boolean {
        return data.body.toLowerCase().includes(event) || data.body.toLowerCase().includes(event);
      };
    },
    err => {
      this.snackBar.open('Server Error (Server not responding correctly)', '', {
        duration: 2000,
        panelClass: ['error-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    })
  }
}
