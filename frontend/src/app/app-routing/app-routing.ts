import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { AuthenticationGuard } from "../core.module/guard/authentication.guard";
// import { ExpiredGuard } from "../core.module/guard/expired.guard";
// import { RoleGuard } from "../core.module/guard/role.guard";

const appRoutes: Routes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: "login",
	},
	// {
	// 	path: "main",
	// 	loadChildren: () => import("../main-page/main-page.module").then(m => m.MainPageModule)
	// },
	{
		path: "login",
		loadChildren: () => import("../login-page/login.module").then(m => m.LoginModule),
	},
    {
        path: "registration",
        loadChildren: () => import("../register-page/register.module").then(m => m.RegisterModule)
    },
	// {
	// 	path: "user",
	// 	loadChildren: () => import("../national-bank-rates/rates-of-nb.module").then(m => m.RatesOfNBModule),
	// 	canActivate: [AuthenticationGuard, RoleGuard],
	// 	data: { authorities: ["SC-ERM_ROLE_NBRATE_VIEW"] }
	// },
	// path: "general-settings",
	// loadChildren: () => import("../general-settings/general-settings.module").then(m => m.GeneralSettingsModule),
	// canActivate: [AuthenticationGuard, RoleGuard],
	// data: { authorities: ["SC-ERM_ROLE_MENU_SETTINGS_USER_ATTRS", "SC-ERM_ROLE_MENU_SETTINGS_DEPARTMENT", "SC-ERM_ROLE_MENU_SETTINGS_TEMPORDER", "SC-ERM_ROLE_MENU_SETTINGS_ORDER", "SC-ERM_ROLE_MENU_SETTINGS_FORMULA_QUOTE"] }
	{
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