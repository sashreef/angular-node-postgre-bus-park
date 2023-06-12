import { NgModule } from "@angular/core";
import { MainComponent } from "./main-page/main.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "../app-routing/app-routing";
import { RouterModule } from "@angular/router";
import { UserComponent } from "./user-page/user.component";
import { AddUserFormComponent } from "./user-page/add-user-form/add-user-form.component";
import { TripsTableComponent } from "./user-page/trips-component/trips-table.component";
import { TripsFormComponent } from "./user-page/trips-component/trips-form/trips-form.component";
import { StatisticsTableComponent } from "./user-page/statistics-component/statistics-table.component";
import { StatisticsPopupComponent } from "./user-page/statistics-component/statistics-popup-component/statistics-popup.component";
import { BusesTableComponent } from "./user-page/bus-component/bus-table.component";
import { BusesFormComponent } from "./user-page/bus-component/bus-form/bus-form.component";
import { DriversFormComponent } from "./user-page/driver-component/driver-form/driver-form.component";
import { DriversTableComponent } from "./user-page/driver-component/driver-table.component";
import { TimetablesFormComponent } from "./user-page/timetable-component/timetable-form/timetable-form.component";
import { TimetablesTableComponent } from "./user-page/timetable-component/timetable-table.component";
import { JourneysFormComponent } from "./user-page/journey-component/journey-form/journey-form.component";
import { JourneysTableComponent } from "./user-page/journey-component/journey-table.component";


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        AppRoutingModule,
        RouterModule
    ],
    exports: [
        MainComponent,
        UserComponent,
        LayoutComponent,
        HeaderComponent,
        AddUserFormComponent,
        TripsTableComponent,
        TripsFormComponent,
        StatisticsTableComponent,
        StatisticsPopupComponent,
        BusesTableComponent,
        BusesFormComponent,
        DriversTableComponent,
        DriversFormComponent,
        TimetablesFormComponent,
        TimetablesTableComponent,
        JourneysFormComponent,
        JourneysTableComponent

    ],
    declarations: [
        MainComponent,
        UserComponent,
        LayoutComponent,
        HeaderComponent,
        AddUserFormComponent,
        TripsTableComponent,
        TripsFormComponent,
        StatisticsTableComponent,
        StatisticsPopupComponent,
        BusesTableComponent,
        BusesFormComponent,
        DriversFormComponent,
        DriversTableComponent,
        TimetablesFormComponent,
        TimetablesTableComponent,
        JourneysFormComponent,
        JourneysTableComponent
    ]
})

export class LayoutModule { }