import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { NavbarModule } from '../navbar/navbar.module';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NavbarModule, CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']  // Corrected from styleUrl to styleUrls
})
export class TaskComponent {
  date = new Date().getTime();
  tasks: any = [];

  task = {
    name: '',
    location: '',
    description: '',
    budget: '',
    depenses: '',
    type: '',
    target: {  // Initialize target with default values
      All: false,
      Men: false,
      Women: false,
      Under: false,
      Over: false
    },
    date: ''
  };

  photo: any;
  updateStep: boolean = false;
  idUpdate: any;

  constructor(private TaskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTask();
  }

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
      this.fetchTask();
    });
  }

  edit(id: any) {
    this.photo = null;
    let tempTask = this.tasks.find((t: any) => t._id === id);
    this.task = { ...tempTask, target: { ...tempTask.target } }; // Ensure target is copied correctly
    this.task.date = tempTask.date;
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

    if (this.task.date) {
      let formattedDate = new Date(this.task.date).toISOString();
      fd.append('date', formattedDate);
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
    if (this.task.date) {
      let formattedDate = new Date(this.task.date).toISOString();
      fd.append('date', formattedDate);
    }

    if (this.photo) {
      fd.append('photo', this.photo);
    }

    this.TaskService.update(this.idUpdate, fd).subscribe(res => {
      console.log("Task updated successfully");
      this.fetchTask();
    });
  }
}
