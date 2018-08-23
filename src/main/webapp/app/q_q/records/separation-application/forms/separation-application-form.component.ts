import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SeparationApplicationService } from "app/entities/separation-application/separation-application.service";
import {
  ISeparationApplication,
  SeparationApplication
} from "app/shared/model/separation-application.model";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { JhiAlertService } from "ng-jhipster";

import { IEmployee } from "app/shared/model/employee.model";
import { EmployeeService } from "app/entities/employee";
import { IHrReps } from "app/shared/model/hr-reps.model";
import { HrRepsService } from "app/entities/hr-reps";
import { IFunctionReps } from "app/shared/model/function-reps.model";
import { FunctionRepsService } from "app/entities/function-reps";

import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "jhi-separation-application-form",
  templateUrl: "./separation-application-form.component.html",
  styleUrls: ["./separation-application-form.component.css"]
})
export class SeparationApplicationFormComponent implements OnInit {
  private _separationApplication: ISeparationApplication;
  isSaving = false;
  employeeOptions: IEmployee[];
  hrRepOptions: IHrReps[];
  functionRepOptions: IFunctionReps[];

  public appForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    dateOfLeave: new FormControl(""),
    dateSubmitted: new FormControl(""),
    dateApproved: new FormControl(""),
    location: new FormControl("")
  });

  constructor(
    private separationApplicationService: SeparationApplicationService,
    private jhiAlertService: JhiAlertService,
    private employeeService: EmployeeService,
    private hrRepsService: HrRepsService,
    private functionRepsService: FunctionRepsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.mapSeparationApplicationToAppForm();
    this.populateEmployeeOptions();
    this.populateFrOptions();
    this.populateHrOptions();
  }

  mapSeparationApplicationToAppForm() {
    this.activatedRoute.data.subscribe((sa: SeparationApplication) => {
      // this.appForm.setValue({});
      console.log(sa);
    });
  }

  populateFrOptions() {
    this.functionRepsService.query().subscribe(
      (res: HttpResponse<IFunctionReps[]>) => {
        this.functionRepOptions = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  populateHrOptions() {
    this.hrRepsService.query().subscribe(
      (res: HttpResponse<IHrReps[]>) => {
        this.hrRepOptions = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  populateEmployeeOptions() {
    this.employeeService
      .query({ filter: "separationapplication-is-null" })
      .subscribe(
        (res: HttpResponse<IEmployee[]>) => {
          if (
            !this.separationApplication.employee ||
            !this.separationApplication.employee.id
          ) {
            this.employeeOptions = res.body;
          } else {
            this.employeeService
              .find(this.separationApplication.employee.id)
              .subscribe(
                (subRes: HttpResponse<IEmployee>) => {
                  this.employeeOptions = [subRes.body].concat(res.body);
                },
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  save() {
    this.isSaving = true;
    if (this.separationApplication.id !== undefined) {
      this.subscribeToSaveResponse(
        this.separationApplicationService.update(this.separationApplication)
      );
    } else {
      this.subscribeToSaveResponse(
        this.separationApplicationService.create(this.separationApplication)
      );
    }
  }

  private onSaveSuccess() {
    this.isSaving = false;
    // this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }

  private subscribeToSaveResponse(
    result: Observable<HttpResponse<ISeparationApplication>>
  ) {
    result.subscribe(
      (res: HttpResponse<ISeparationApplication>) => this.onSaveSuccess(),
      (res: HttpErrorResponse) => this.onSaveError()
    );
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackEmployeeById(index: number, item: IEmployee) {
    return item.id;
  }

  trackHrRepsById(index: number, item: IHrReps) {
    return item.id;
  }

  trackFunctionRepsById(index: number, item: IFunctionReps) {
    return item.id;
  }
  get separationApplication() {
    return this._separationApplication;
  }

  set separationApplication(separationApplication: ISeparationApplication) {
    this._separationApplication = separationApplication;
  }
}
