import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../login-page/login.component";
import { RegisterComponent } from "../register-page/register.component";
import { MainComponent } from "../layout/main-page/main.component";

const appRoutes: Routes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: "/login",
	},
	{
		path: "login",
        component: LoginComponent
	},
    {
        path: "registration",
        component: RegisterComponent
    },
	{
        path: "mainpage",
        component: MainComponent
    },
	{
        pathMatch: "full",
		path: "**",
		redirectTo: "/login",
	},
];

@NgModule({
	declarations: [],
	exports: [RouterModule],
	imports: [
		RouterModule.forRoot(appRoutes),
	]
})
export class AppRoutingModule { }