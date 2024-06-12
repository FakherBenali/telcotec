import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  author = {
    companyname: '',
    companyaddress: '',
    vatnumber: '',
    website: '',
    primaryfocus: '',
    about: '',
    applicantinfo : '',
    firstname: '',
    lastname: '',
    email: '',
    title: '',
    applicantnumber :'',
    password:''
  }

  logo: any;
  rne: any;
  patente: any;

  selectLogo(e:any){
    this.logo = e.target.files[0];
  }

  selectRNE(e:any){
    this.rne = e.target.files[0];
  }
  selectPATENTE(e:any){
    this.patente = e.target.files[0];
  }


  constructor( private _auth: AuthService , private router: Router){  }

  register(){
    let fd = new FormData()
    fd.append('companyname',this.author.companyname);
    fd.append('companyaddress',this.author.companyaddress);
    fd.append('vatnumber',this.author.vatnumber);
    fd.append('website',this.author.website);
    fd.append('primaryfocus',this.author.primaryfocus);
    fd.append('about',this.author.about);
    fd.append('applicantinfo',this.author.applicantinfo);
    fd.append('firstname',this.author.firstname);
    fd.append('lastname',this.author.lastname);
    fd.append('email',this.author.email);
    fd.append('password',this.author.password);
    fd.append('title',this.author.title);
    fd.append('applicantnumber',this.author.applicantnumber);
    fd.append('logo',this.logo);
    fd.append('rne',this.rne);
    fd.append('patente',this.patente);

    

    this._auth.register(fd)
      .subscribe(
        res=>{
          // this.router.navigate(['/login']);
          console.log("ok");
        }
      )
  }

}
