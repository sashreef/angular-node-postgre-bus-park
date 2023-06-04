import { NgModule } from "@angular/core";
import { BackendService } from "./backend.service";
import { FormBuilderService } from "./form-builder.service";
import { FormMapperService } from "./form-mapper.service";
import { ManageService } from "./manage.service";
import { ConfigurationService } from "./configuration.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth.interceptor";




@NgModule({
    declarations: [
        // BackendService
    ],
    imports: [
        HttpClientModule
	],
    providers: [
        ConfigurationService,
        ManageService,
        BackendService,
        FormBuilderService,
        FormMapperService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, 
    ]
})

export class ServicesModule { }