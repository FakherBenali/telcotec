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

  date = new Date().getTime();
  tasks: any = [];

  task = {
    name: '',
    location: '',
    description: '',
    budget: '',
    depenses: '',
    type: '',
    target: {
      All: false,
      Men: false,
      Women: false,
      Under: false,
      Over: false
    },
    startDate: null as Date | null,
    endDate: null as Date | null
  };
  photo: any;
  updateStep: boolean = false;
  idUpdate: any;
  




  fetchTask(): void {
    this.TaskService.getAll().subscribe(tasks => {
      console.log('Fetched tasks:', tasks);
      this.tasks = tasks;
    });
  }

  selectPhoto(e: any) {
    this.photo = e.target.files[0];
  }

  replaceText(e: string) {
    return "http://localhost:3000/" + e.replace('uploads', '');
  }

  delete(id: any) {
    this.TaskService.delete(id).subscribe(() => {
      this.fetchTask()
    });
  }

  edit(id: any) {
    this.photo = null;
    let tempTask = this.tasks.filter((t: any) => t._id == id)[0];
    this.task.name = tempTask.name;
    this.task.location = tempTask.location;
    this.task.description = tempTask.description;
    this.task.budget = tempTask.budget;
    this.task.depenses = tempTask.depenses;
    this.task.type = tempTask.type;
    this.task = { ...tempTask, target: { ...tempTask.target } };
    this.task.startDate = new Date(tempTask.startDate);
    this.task.endDate = new Date(tempTask.endDate);
    console.log(tempTask);
    this.updateStep = true;
    this.idUpdate = id;
  }

  save() {
    let fd = new FormData();
    fd.append('name', this.task.name);
    fd.append('type', this.task.type);
    fd.append('location', this.task.location);
    fd.append('description', this.task.description);
    fd.append('budget', this.task.budget);
    fd.append('depenses', this.task.depenses);
    fd.append('target', JSON.stringify(this.task.target));

    if (this.task.startDate) {
      fd.append('startDate', this.task.startDate.toISOString());
    }
    if (this.task.endDate) {
      fd.append('endDate', this.task.endDate.toISOString());
    }

    if (this.photo) {
      fd.append('photo', this.photo);
    }

    this.TaskService.save(fd).subscribe(res => {
      console.log("Task saved successfully");
      this.fetchTask();
    });
  }

  update() {
    let fd = new FormData();
    fd.append('name', this.task.name);
    fd.append('type', this.task.type);
    fd.append('location', this.task.location);
    fd.append('description', this.task.description);
    fd.append('budget', this.task.budget);
    fd.append('depenses', this.task.depenses);
    fd.append('target', JSON.stringify(this.task.target));

    if (this.task.startDate) {
      fd.append('startDate', this.task.startDate.toISOString());
    }
    if (this.task.endDate) {
      fd.append('endDate', this.task.endDate.toISOString());
    }

    if (this.photo) {
      fd.append('photo', this.photo);
    }

    this.TaskService.update(this.idUpdate, fd).subscribe(res => {
      console.log("Task updated successfully");
      this.fetchTask();
    });
  }

  calculateTaskDuration(startDate: Date, endDate: Date): number {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const diff = end - start;
    return diff / (1000 * 60 * 60 * 24); // Convert milliseconds to days
  }
}
