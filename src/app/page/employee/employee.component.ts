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
  pageIndex: any = 0;
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
    this.dataSource = new MatTableDataSource(this.EmployeeList);
    this.initEmployeeForm();
  }
  //#region List of Employee with Actions
  ngOnInit(): void {
    this.getAllEmployees();
  }

  initEmployeeForm() {
    this.empForm = this.formBuilder.group({
      id: [''],
      Name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z]+')]],
      Email: ['', [Validators.required, Validators.email]],
      CompanyName: ['', [Validators.required, Validators.minLength(2)]],
      PhoneNumber: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(12)]],
    });
  }

  getAllEmployees = async () => {
    this.ngxService.start();
    const EmployeData = await this.firestoreDataService.getEmployees({
      "pageNo": this.pageIndex + 1,
      "limit": this.pageSize
    });
    if (EmployeData.success == true) {
      this.EmployeeList = EmployeData.row;
      this.totalRecords = EmployeData.pagination.totalRecords
    } else {
      this.EmployeeList = [];
      this.totalRecords = 0;
    }
    this.dataSource.data = this.EmployeeList;
    this.paginator.pageIndex = this.pageIndex;
    this.paginator.length = this.totalRecords;
    this.ngxService.stop();
  };

  onPageorPageSizeChange() {
    this.pageIndex = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.getAllEmployees();
  }

  deleteEmployee = async (id: any) => {
    if (confirm("Are you sure to delete employee?")) {
      this.ngxService.start();
      const deleteEmp: any = await this.firestoreDataService.deleteEmployee(id);
      this.ngxService.stop();
      if (deleteEmp) {
        this._snackBar.open("Employee Deleted Successfully.", "Close", { duration: 3000 });
        this.getAllEmployees();
      }
    }
  }

  selectTab = async (index: number) => {
    if (index !== this.selectedTabIndex) {
      this.selectedTabIndex = index;
      if (this.selectedTabIndex === 1) {
        await this.resetEmployeeForm();
      }
    }
  }

  editEmployee = async (objRow: EmployeInfo) => {
    console.log(objRow);
    await this.selectTab(1);

    this.empForm.patchValue({
      id: objRow.id,
      Name: objRow.Name,
      Email: objRow.Email,
      CompanyName: objRow.CompanyName,
      PhoneNumber: objRow.PhoneNumber,
    });
  }

  //#endregion

  //#region Add Employee
  isFieldValidate(field: any) {
    return this.empForm.controls[field].invalid && (this.empForm.controls[field].dirty || this.empForm.controls[field].touched);
  }

  SaveEmployee = async () => {
    this.ngxService.start();
    const CreateEmploye: any = await this.firestoreDataService.createEmployee({
      CompanyName: this.empForm.value.CompanyName,
      Email: this.empForm.value.Email,
      Name: this.empForm.value.Name,
      PhoneNumber: this.empForm.value.PhoneNumber,
    });
    this.ngxService.stop();

    if (CreateEmploye.success) {
      this._snackBar.open(CreateEmploye.message, "Close", { duration: 3000 });
      this.getAllEmployees();
      this.selectTab(0);
    } else {
      this._snackBar.open(CreateEmploye.message, "Close", { duration: 5000 });
    }
  }

  resetEmployeeForm = async () => {
    await this.empForm.reset();
  }
  //#endregion
}

export interface EmployeInfo {
  id: string;
  Name: string;
  Email: string;
  CompanyName: string;
  PhoneNumber: string;
}

