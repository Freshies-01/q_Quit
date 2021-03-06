import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { JhiAlertService } from "ng-jhipster";

import { IEmployee } from "app/shared/model/employee.model";
import { EmployeeService } from "app/entities/employee/employee.service";
import { ILocation } from "app/shared/model/location.model";
import { LocationService } from "app/entities/location";
import { ISeparationApplication } from "app/shared/model/separation-application.model";
import { SeparationApplicationService } from "app/entities/separation-application";
import { IUser, UserService } from "app/core";
import { IHrReps } from "app/shared/model/hr-reps.model";
import { HrRepsService } from "app/entities/hr-reps";
import { IFunctionReps } from "app/shared/model/function-reps.model";
import { FunctionRepsService } from "app/entities/function-reps";
import { IDepartment } from "app/shared/model/department.model";
import { DepartmentService } from "app/entities/department";

@Component({
  selector: "jhi-employee-update",
  templateUrl: "./employee-update.component.html"
})
export class EmployeeUpdateComponent implements OnInit {
  private _employee: IEmployee;
  isSaving: boolean;

  locations: ILocation[];

  separationapplications: ISeparationApplication[];

  users: IUser[];

  hrreps: IHrReps[];

  functionreps: IFunctionReps[];

  departments: IDepartment[];

  constructor(
    private jhiAlertService: JhiAlertService,
    private employeeService: EmployeeService,
    private locationService: LocationService,
    private separationApplicationService: SeparationApplicationService,
    private userService: UserService,
    private hrRepsService: HrRepsService,
    private functionRepsService: FunctionRepsService,
    private departmentService: DepartmentService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ employee }) => {
      this.employee = employee;
    });
    this.locationService.query().subscribe(
      (res: HttpResponse<ILocation[]>) => {
        this.locations = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.separationApplicationService.query().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.separationapplications = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.userService.query().subscribe(
      (res: HttpResponse<IUser[]>) => {
        this.users = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.hrRepsService.query().subscribe(
      (res: HttpResponse<IHrReps[]>) => {
        this.hrreps = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.functionRepsService.query().subscribe(
      (res: HttpResponse<IFunctionReps[]>) => {
        this.functionreps = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.departmentService.query().subscribe(
      (res: HttpResponse<IDepartment[]>) => {
        this.departments = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.employee.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeService.update(this.employee));
    } else {
      this.subscribeToSaveResponse(this.employeeService.create(this.employee));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IEmployee>>) {
    result.subscribe(
      (res: HttpResponse<IEmployee>) => this.onSaveSuccess(),
      (res: HttpErrorResponse) => this.onSaveError()
    );
  }

  private onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackLocationById(index: number, item: ILocation) {
    return item.id;
  }

  trackSeparationApplicationById(index: number, item: ISeparationApplication) {
    return item.id;
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackHrRepsById(index: number, item: IHrReps) {
    return item.id;
  }

  trackFunctionRepsById(index: number, item: IFunctionReps) {
    return item.id;
  }

  trackDepartmentById(index: number, item: IDepartment) {
    return item.id;
  }
  get employee() {
    return this._employee;
  }

  set employee(employee: IEmployee) {
    this._employee = employee;
  }
}
