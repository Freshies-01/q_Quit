import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes
} from "@angular/router";
import { HttpResponse } from "@angular/common/http";
import { SeparationApplicationListComponent } from "./separation-application-list.component";
import { SeparationApplicationFormComponent } from "./forms/separation-application-form.component";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { SeparationApplicationService } from "app/entities/separation-application/separation-application.service";
import { ISeparationApplication } from "app/shared/model/separation-application.model";
import { SeparationApplication } from "app/shared/model/separation-application.model";

@Injectable({ providedIn: "root" })
export class QQSeparationApplicationResolve
  implements Resolve<ISeparationApplication> {
  constructor(private service: SeparationApplicationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params["id"] ? route.params["id"] : null;
    if (id) {
      return this.service
        .find(id)
        .pipe(
          map(
            (separationApplication: HttpResponse<SeparationApplication>) =>
              separationApplication.body
          )
        );
    }
    return of(new SeparationApplication());
  }
}

export const separationApplicationRoute: Routes = [
  {
    path: "separationApplication",
    component: SeparationApplicationListComponent
  },
  {
    path: "separationApplication/:id/view",
    component: SeparationApplicationFormComponent,
    resolve: {
      separationApplication: QQSeparationApplicationResolve
    }
  },
  {
    path: "separationApplication/new",
    component: SeparationApplicationFormComponent,
    data: {
      pageTitle: "New Separation Application"
    },
    resolve: {
      separationApplication: QQSeparationApplicationResolve
    }
  }
];
