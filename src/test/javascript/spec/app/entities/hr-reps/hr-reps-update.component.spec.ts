/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { QQuitTestModule } from '../../../test.module';
import { HrRepsUpdateComponent } from 'app/entities/hr-reps/hr-reps-update.component';
import { HrRepsService } from 'app/entities/hr-reps/hr-reps.service';
import { HrReps } from 'app/shared/model/hr-reps.model';

describe('Component Tests', () => {
    describe('HrReps Management Update Component', () => {
        let comp: HrRepsUpdateComponent;
        let fixture: ComponentFixture<HrRepsUpdateComponent>;
        let service: HrRepsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [QQuitTestModule],
                declarations: [HrRepsUpdateComponent]
            })
                .overrideTemplate(HrRepsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HrRepsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HrRepsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HrReps(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hrReps = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HrReps();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hrReps = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
