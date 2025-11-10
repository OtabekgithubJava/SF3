import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Exams {
  date: string;
  subject: string;
  score: number;
  qualifying: number;
  message: string;
}

interface Student {
  id: number;
  name: string;
  image: string;
  exams?: Exams[];
}

@Component({
  selector: 'app-exam',
  standalone: false,
  templateUrl: './exam.html',
  styleUrls: ['./exam.scss']
})
export class Exam implements OnInit {
  currentStudent: any = null;
  exams: Exams[] = [];

  ngOnInit(): void {
    this.loadStudentData();
  }

  private loadStudentData(): void {
    const studentData = localStorage.getItem('currentStudent');
    if (studentData) {
      try {
        this.currentStudent = JSON.parse(studentData);
        this.exams = this.currentStudent.exams || [];
      } catch (e) {
        console.error('Failed to parse currentStudent', e);
      }
    } else {
      this.currentStudent = { name: 'Noma\'lum', image: 'assets/default-avatar.jpg' };
    }
  }

  getScoreColor(score: number, qualifying: number): string {
    if (score >= 90) return '#10b981';
    if (score >= qualifying) return '#3b82f6';
    return '#ef4444';
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  getBadgeClass(score: number, qualifying: number): string {
    if (score >= 90) return 'badge-success';
    if (score >= qualifying) return 'badge-info';
    return 'badge-danger';
  }
}