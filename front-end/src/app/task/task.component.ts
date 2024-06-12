import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { NavbarModule } from '../navbar/navbar.module';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NavbarModule, CommonModule,FormsModule ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  // date = new Date().getTime();
  tasks: any = []

  task = {

    name: '',
    location: '',
    description: '',
    number: '',
    price: '',
   
  }
  photo: any;
  updateStep: boolean = false
  idUpdate: any;
  
  constructor( private TaskService: TaskService , private router: Router){  }

  ngOnInit(): void {

    this.fetchTask();

  }

  fetchTask(): void {
    this.TaskService.getAll()
      .subscribe(tasks => {
        this.tasks = tasks;
        
      });
  }

  selectPhoto(e:any){
    this.photo = e.target.files[0];
  }
  
  replaceText(e: string){
    return "http://localhost:3000/" + e.replace('uploads', '');
  }

  delete(id: any) {
    this.TaskService.delete(id).subscribe(
      () => {
        this.fetchTask()

      }
    )
  }

  edit(id: any) {
    this.photo = null;
    let tempTask = this.tasks.filter((t:any) => t._id == id)[0]
    this.task.name = tempTask.name;
    this.task.location = tempTask.location;
    this.task.description= tempTask.description;
    this.task.number= tempTask.number;
    this.task.price= tempTask.price;
    console.log(tempTask)
    this.updateStep = true;
    this.idUpdate = id;
  }
  save(){
    let fd = new FormData()
    fd.append('name',this.task.name);
    fd.append('location',this.task.location);
    fd.append('description',this.task.description);
    fd.append('number',this.task.number);
    fd.append('price',this.task.price);
    

    fd.append('photo',this.photo);

    console.log(fd);
    

    this.TaskService.save(fd)
      .subscribe(
        res=>{
          // this.router.navigate(['/login']);
          console.log("ok");
          this.fetchTask();

        }
      )
  }


  update(){

    let fd = new FormData()
    fd.append('name',this.task.name);
    fd.append('location',this.task.location);
    fd.append('description',this.task.description);
    fd.append('number',this.task.number);
    fd.append('price',this.task.price);
    

    fd.append('photo',this.photo);

    console.log(fd);
    
    this.TaskService.update(this.idUpdate, fd)
      .subscribe(
        res=>{
          // this.router.navigate(['/login']);
          console.log("ok");
          this.fetchTask();

        }
      )

  }

}
