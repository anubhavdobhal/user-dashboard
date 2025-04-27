import { Component,OnInit  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
import { Chart, registerables } from 'chart.js';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  displayedColumns: string[] = [ 'name', 'email', 'role'];
  chart: any;
  isLoading = true;
  roleCounts = { Admin: 0, Editor: 0, Viewer: 0 };
  users: any[] = [];

  dataSource: MatTableDataSource<User>;

  constructor(public dialog: MatDialog,private userService: UserService) {
    Chart.register(...registerables);
    this.dataSource = new MatTableDataSource(this.users);
  }
    ngOnInit(): void {
      this.userService.users$.subscribe(users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
        setTimeout(()=>{ this.isLoading = false;},10000)
        this.updateRoleCounts();
      });
    }
    openAddUserForm() { 
      const dialogRef = this.dialog.open(UserFormComponent);
    
      const userCreated = dialogRef.componentInstance.userCreated;
      userCreated.subscribe((userData: any) => {
        const newUser = {
          ...userData,
        };
        this.userService.addUser(newUser); 
        this.updateRoleCounts();
          this.createChart();
        dialogRef.close();
        this.isLoading = true
      });
    }

    createChart() {
      if (this.chart) {
        this.chart.destroy(); 
      }
    
      this.chart = new Chart('roleChart', {
        type: 'pie',
        data: {
          labels: ['Admin', 'Editor', 'Viewer'],
          datasets: [
            {
              data: [
                this.roleCounts.Admin,
                this.roleCounts.Editor,
                this.roleCounts.Viewer
              ],
              backgroundColor: ['#1c4980', '#383838', '#7cb342'],
              hoverOffset: 4
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            }
          }
        }
      });
    }
    updateRoleCounts() {
      this.roleCounts = { Admin: 0, Editor: 0, Viewer: 0 };
      this.users.forEach(user => {
        if (user.role === 'Admin') this.roleCounts.Admin++;
        else if (user.role === 'Editor') this.roleCounts.Editor++;
        else if (user.role === 'Viewer') this.roleCounts.Viewer++;
      });
    }
    ngAfterViewInit(): void {
      
      this.createChart();
    }
}
