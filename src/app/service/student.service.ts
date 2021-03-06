import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Student} from "../model/Student";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  selectedImage!: File;
  profileImageUrl = '';
  dataSource = new MatTableDataSource<Student>();

  constructor(private http: HttpClient, private configService: ConfigService) { }

  form: FormGroup = new FormGroup({
    fname: new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
    lname: new FormControl('',[Validators.minLength(3)]),
    oname: new FormControl('',[Validators.minLength(3)]),
    line1:new FormControl('',[Validators.required,Validators.minLength(3)]),
    line2: new FormControl('',[Validators.minLength(3)]),
    contact: new FormControl('',[Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^0[1-9][0-9]{8}$')]),
    email: new FormControl('',[Validators.pattern('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')]),
    nic: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    month: new FormControl('',[Validators.required]),
    year:  new FormControl('',[Validators.required]),
    gender:new FormControl('MALE',[Validators.required]),
    dsDivision: new FormControl('',[Validators.required]),
    gnDivision: new FormControl('',[Validators.required]),
    language: new FormControl('',[Validators.required]),
    experience: new FormControl('',[Validators.required]),
    isFollowed: new FormControl(false,[Validators.required]),
    courseDuration: new FormControl('')
  });

  initializeFormGroup(){
    this.form.setValue({
      fname:'',
      lname: '',
      oname: '',
      line1: '',
      line2: '',
      contact: '',
      email: '',
      nic: '',
      date: '',
      month: '',
      year: '',
      gender: 'MALE',
      dsDivision: '',
      gnDivision: '',
      language: '',
      experience: '',
      isFollowed: false,
      courseDuration: ''
    });
  }

  populateForm(student: Student){
    this.form.setValue({
      fname: student.fname,
      lname: student.lname,
      oname: student.oname,
      line1: student.line1,
      line2: student.line2,
      contact: student.contact,
      email: student.email,
      nic: student.nic,
      date: student.date,
      month: student.month,
      year: student.year,
      gender: student.gender,
      dsDivision: student.dsDivision,
      gnDivision: student.gnDivision,
      language: student.language,
      experience: student.experience,
      isFollowed: student.isFollowed,
      courseDuration: student.courseDuration
    })
  }

  get registerFormControl(){
    return this.form.controls;
  }

  getAllStudents(): Observable<Array<Student>>{
    return this.http.get<Array<Student>>(this.configService.BASE_URL+`/api/v1/student`,{});
  }

  saveStudent(student: Student):Observable<Student>{
    const fd = new FormData();
    if(this.profileImageUrl !== ''){
      fd.append('file',this.selectedImage,this.selectedImage.name);
      student.hasImage = true;
    }
    fd.append('body',JSON.stringify(student));
    return this.http.post<Student>(this.configService.BASE_URL+`/api/v1/student`,fd);
  }

  deleteStudent(id: string):Observable<any>{
    return this.http.delete(this.configService.BASE_URL+`/api/v1/student/${id}`,{
      responseType: "text"
    });
  }

  getPdf(id: string){
    alert(this.configService.BASE_URL+`/api/v1/student/`)
    return this.http.get(this.configService.BASE_URL+`/api/v1/student/${id}/pdf`,{
      responseType: 'blob'
    });
  }
}
