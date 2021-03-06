import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";

import { ILocation } from "app/shared/model/location.model";
import { LocationService } from "app/entities/location/location.service";

@Component({
  selector: "jhi-location-update",
  templateUrl: "./location-update.component.html"
})
export class LocationUpdateComponent implements OnInit {
  private _location: ILocation;
  isSaving: boolean;

  constructor(
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ location }) => {
      this.location = location;
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.location.id !== undefined) {
      this.subscribeToSaveResponse(this.locationService.update(this.location));
    } else {
      this.subscribeToSaveResponse(this.locationService.create(this.location));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<ILocation>>) {
    result.subscribe(
      (res: HttpResponse<ILocation>) => this.onSaveSuccess(),
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
  get location() {
    return this._location;
  }

  set location(location: ILocation) {
    this._location = location;
  }
}
