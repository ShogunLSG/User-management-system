import { Component } from '@angular/core';
import { AdminService } from 'src/app/Services/adminServices/admin.service';

export interface userDetails {
  id: number;
  name: string;
  email: string;
  role: string;
}


// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {

  constructor( private AdminService: AdminService) { }
  ngOnInit() {
    console.log("dashboard");
    this.AdminService.getUsersForAdmin().subscribe((data: any) => {
      this.dataResponse = data;

      this.dataResponse.forEach((dataItem: any) => {
        const userDetailsItem: userDetails = {
          id: dataItem.id,
          name: dataItem.name,
          email: dataItem.email,
          role: dataItem.role
        };

        this.dataSource.push(userDetailsItem);
      });

      console.log("data in for each: ", this.dataSource);
    });

  }

  links = ['First', 'Second', 'Third'];
  dataResponse: userDetails[] = [];
  dataSource: Object[] = [];
  displayedColumns: string[] = ['id', 'NAME', 'ROLE', 'EMAIL'];

}
