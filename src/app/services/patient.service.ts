import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor() { }

  setPatient(patient: Patient) {
    localStorage.setItem('curPatient', JSON.stringify(patient));
  }
  getCurrentPatient(): Patient {
    return JSON.parse(localStorage.getItem('curPatient'));
  }
}
