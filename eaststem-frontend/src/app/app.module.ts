import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { UserService} from './services/user.service';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { StudentNavComponent } from './components/student-nav/student-nav.component';
import { RegisterComponent } from './components/register/register.component';
import { UrlPermissionService } from './services/url-permission.service';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { TeacherHomeComponent } from './components/teacher-home/teacher-home.component';
import { CourseManagerHomeComponent } from './components/course-manager-home/course-manager-home.component';
import { FinanceManagerHomeComponent } from './components/finance-manager-home/finance-manager-home.component';
import { FinanceManagerNavComponent } from './components/finance-manager-nav/finance-manager-nav.component';
import { CourseManagerNavComponent } from './components/course-manager-nav/course-manager-nav.component';
import { TeacherNavComponent } from './components/teacher-nav/teacher-nav.component';
import { StudentRegisterCourseComponent } from './components/student-register-course/student-register-course.component';
import { StudentAssignmentComponent } from './components/student-assignment/student-assignment.component';
import { StudentCourseComponent } from './components/student-course/student-course.component';
import { StudentScholarshipComponent } from './components/student-scholarship/student-scholarship.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { CourseService } from './services/course.service';
import { AssignmentService } from './services/assignment.service';
import { StudentAssignmentSubmissionComponent } from './components/student-assignment-submission/student-assignment-submission.component';
import { StudentGradeComponent } from './components/student-grade/student-grade.component';
import { ScholarshipService } from './services/scholarship.service';
import { CourseManagerManageCourseComponent } from './components/course-manager-manage-course/course-manager-manage-course.component';
import { FinanceManagerScholarshipComponent } from './components/finance-manager-scholarship/finance-manager-scholarship.component';
import { FinanceManagerScholarshipAttachmentComponent } from './components/finance-manager-scholarship-attachment/finance-manager-scholarship-attachment.component';
import { FinanceManagerCourseRateComponent } from './components/finance-manager-course-rate/finance-manager-course-rate.component';
import { TeacherCourseComponent } from './components/teacher-course/teacher-course.component';
import { TeacherAssignmentComponent } from './components/teacher-assignment/teacher-assignment.component';
import { TeacherAssignmentSubmissionComponent } from './components/teacher-assignment-submission/teacher-assignment-submission.component';
import { CoverComponent } from './components/cover/cover.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

const appRoutes: Routes = [
  {path: 'student/home', component: StudentHomeComponent, canActivate: [UrlPermissionService]},
  {path: 'student/course', component: StudentCourseComponent, canActivate: [UrlPermissionService]},
  {path: 'student/courseRegister', component: StudentRegisterCourseComponent, canActivate: [UrlPermissionService]},
  {path: 'student/assignment/submission', component: StudentAssignmentSubmissionComponent, canActivate: [UrlPermissionService]},
  {path: 'student/assignment', component: StudentAssignmentComponent, canActivate: [UrlPermissionService]},
  {path: 'student/grade', component: StudentGradeComponent, canActivate: [UrlPermissionService]},
  {path: 'student/scholarship', component: StudentScholarshipComponent, canActivate: [UrlPermissionService]},
  {path: 'student/info', component: StudentInfoComponent, canActivate: [UrlPermissionService]},
  {path: 'teacher/home', component: TeacherHomeComponent, canActivate: [UrlPermissionService]},
  {path: 'teacher/course', component: TeacherCourseComponent, canActivate: [UrlPermissionService]},
  {path: 'teacher/assignment', component: TeacherAssignmentComponent, canActivate: [UrlPermissionService]},
  {path: 'teacher/assignment/submission', component: TeacherAssignmentSubmissionComponent, canActivate: [UrlPermissionService]},
  {path: 'courseManager/home', component: CourseManagerHomeComponent, canActivate: [UrlPermissionService]},
  {path: 'courseManager/manageCourse', component: CourseManagerManageCourseComponent, canActivate: [UrlPermissionService]},
  {path: 'financeManager/home', component: FinanceManagerHomeComponent, canActivate: [UrlPermissionService]},
  {path: 'financeManager/scholarship', component: FinanceManagerScholarshipComponent, canActivate: [UrlPermissionService]},
  {path: 'financeManager/scholarshipAttachment', component: FinanceManagerScholarshipAttachmentComponent, canActivate: [UrlPermissionService]},
  {path: 'financeManager/courseRate', component: FinanceManagerCourseRateComponent, canActivate: [UrlPermissionService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'cover', component: CoverComponent},
  {path: '', redirectTo: '/cover', pathMatch: 'full' }
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderComponent,
    LoginComponent,
    StudentNavComponent,
    RegisterComponent,
    AboutComponent,
    ContactComponent,
    StudentHomeComponent,
    TeacherHomeComponent,
    CourseManagerHomeComponent,
    FinanceManagerHomeComponent,
    FinanceManagerNavComponent,
    CourseManagerNavComponent,
    TeacherNavComponent,
    StudentRegisterCourseComponent,
    StudentAssignmentComponent,
    StudentCourseComponent,
    StudentScholarshipComponent,
    StudentInfoComponent,
    StudentAssignmentSubmissionComponent,
    StudentGradeComponent,
    CourseManagerManageCourseComponent,
    FinanceManagerScholarshipComponent,
    FinanceManagerScholarshipAttachmentComponent,
    FinanceManagerCourseRateComponent,
    TeacherCourseComponent,
    TeacherAssignmentComponent,
    TeacherAssignmentSubmissionComponent,
    CoverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, CourseService, AssignmentService, ScholarshipService, UrlPermissionService, {provide: LocationStrategy, useClass: HashLocationStrategy,}],
  bootstrap: [AppComponent]
})
export class AppModule { }
