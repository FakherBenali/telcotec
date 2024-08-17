import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarModule } from '../navbar/navbar.module';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NavbarModule,
  ]
})
export class TaskComponent {
  taskForm: FormGroup;
  eligibleUsers: number | undefined;
  totalPrice: number | undefined;

  constructor(private TaskService: TaskService , private router: Router,private fb: FormBuilder, private taskService: TaskService) {
    this.fetchTask();
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      taskType: ['', Validators.required],
      description: [''],
      sex: [''],
      ageRange: this.fb.group({
        min: [''],
        max: ['']
      }),
      zone: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      taskData.target = {
        sex: taskData.sex,
        ageRange: [taskData.ageRange.min, taskData.ageRange.max],
        zone: taskData.zone
      };

      this.taskService.createTask(taskData).subscribe(response => {
        console.log('Task created', response);
        // Handle success
      }, error => {
        console.error('Error creating task', error);
        // Handle error
      });
    }
  }

  calculatePrice() {
    const target = {
      sex: this.taskForm.get('sex')?.value,
      ageRange: [this.taskForm.get('ageRange.min')?.value, this.taskForm.get('ageRange.max')?.value],
      zone: this.taskForm.get('zone')?.value
    };

    this.taskService.calculatePrice(target).subscribe(response => {
      this.eligibleUsers = response.numberOfEligibleUsers;
      this.totalPrice = response.totalPrice;
    }, error => {
      console.error('Error calculating price', error);
    });
  }

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
