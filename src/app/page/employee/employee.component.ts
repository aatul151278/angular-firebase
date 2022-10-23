import { Component, OnInit } from '@angular/core';
import { FirestoreDataService } from 'src/app/service/firestore-data.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(public firestoreDataService: FirestoreDataService) { }

  ngOnInit(): void {

    // // createEmployee
    // this.firestoreDataService.createEmployee({
    //   "Name": "AAss P",
    //   "Email": "Acss@gmail.com",
    //   "CompanyName": "MM 1",
    //   "PhoneNumber": "568553545"
    // });


  //   this.firestoreDataService.getEmployees({
  //     "pageNo": 1,
   //    "limit": 5
   //  });

  }

}
