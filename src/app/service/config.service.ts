import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  BASE_URL = 'https://international-school.herokuapp.com';

  constructor() { }
}
