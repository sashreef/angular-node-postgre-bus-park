import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../login-page/login.component";
import { RegisterComponent } from "../register-page/register.component";
import { MainComponent } from "../layout/main-page/main.component";
import { UserComponent } from "../layout/user-page/user.component";

const appRoutes: Routes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: "/main",
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
        path: "main",
        component: MainComponent
    },

	{
        path: "user_page",
        component: UserComponent
    },

	{
        pathMatch: "full",
		path: "**",
		redirectTo: "/main",
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