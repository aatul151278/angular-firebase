import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { async } from '@firebase/util';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FirestoreDataService } from 'src/app/service/firestore-data.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  selectedTabIndex: any = 0;
  pageIndex: any = 1;
  pageSize: any = 5;
  displayedColumns: string[] = ['Name', 'Email', 'CompanyName', 'PhoneNumber', 'Action'];
  dataSource: any;
  EmployeeList: Array<EmployeInfo> = [];
  totalRecords = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: any;
  empForm: any;

  constructor(public firestoreDataService: FirestoreDataService,
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
  ) {
    this.initEmployeeForm();
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  initEmployeeForm() {
    this.empForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z]+')]],
      Email: ['', [Validators.required, Validators.email]],
      CompanyName: ['', [Validators.required, Validators.minLength(2)]],
      PhoneNumber: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
  }

  getAllEmployees = async () => {
    this.ngxService.start();
    const EmployeData = await this.firestoreDataService.getEmployees({
      "pageNo": this.pageIndex,
      "limit": this.pageSize
    });
    if (EmployeData.success == true) {
      this.EmployeeList = EmployeData.row;
      this.totalRecords = EmployeData.pagination.totalRecords
    } else {
      this.EmployeeList = [];
      this.totalRecords = 0;
    }
    this.dataSource = new MatTableDataSource(this.EmployeeList);
    this.dataSource.paginator = this.paginator;
    this.ngxService.stop();

  };

  onPageorPageSizeChange() {
    this.pageIndex = this.paginator.pageIndex + 1;
    this.pageSize = this.paginator.pageSize;
    this.getAllEmployees();
  }

  deleteEmployee = async (id: any) => {
    this.ngxService.start();
    const deleteEmp: any = await this.firestoreDataService.deleteEmployee(id);
    this.ngxService.stop();
    if (deleteEmp) {
      this._snackBar.open("Employee Deleted Successfully.", "Close", { duration: 3000 });
      this.getAllEmployees();
    }
  }

  selectTab(index: number) {
    this.selectedTabIndex = index;
    if (this.selectedTabIndex === 1) {
      this.resetEmployeeForm();
    }
  }

  SaveEmployee = async () => {
    this.ngxService.start();
    const CreateEmploye: any = await this.firestoreDataService.createEmployee(this.empForm.value);
    this.ngxService.stop();

    if (CreateEmploye.success) {
      this.resetEmployeeForm();
      this._snackBar.open(CreateEmploye.message, "Close", { duration: 3000 });
      this.getAllEmployees();
      this.selectTab(0);
    } else {
      this._snackBar.open(CreateEmploye.message, "Close", { duration: 5000 });
    }
  }

  resetEmployeeForm = async () => {
    this.empForm.reset();
  }
}

export interface EmployeInfo {
  id: string;
  Name: string;
  Email: string;
  CompanyName: string;
  PhoneNumber: string;
}

