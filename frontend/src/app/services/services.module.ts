import { NgModule } from "@angular/core";
import { BackendService } from "./backend.service";
import { FormBuilderService } from "./form-builder.service";
import { FormMapperService } from "./form-mapper.service";
import { HttpClientModule } from "@angular/common/http";
import { ManageService } from "./manage.service";
import { ConfigurationService } from "./configuration.service";




@NgModule({
    declarations: [
        // BackendService
    ],
    imports: [
		HttpClientModule,
	],
    providers: [
        ConfigurationService,
        ManageService,
        BackendService,
        FormBuilderService,
        FormMapperService
    ]
})

export class ServicesModule { }