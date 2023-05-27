import { PlatformLocation } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable()
export class ConfigurationService {
    private readonly _baseHref: string;
	public appName?: string;
	public viewUser?: string;

    constructor(platformLocation: PlatformLocation) {
        this._baseHref = platformLocation.getBaseHrefFromDOM();
    }

    public get api() {
        return {
            root:`${this._baseHref}api`
        }
    }

    public get conf() {
		return {
			root: `${this._baseHref}cfg`
		};
	}

	public get users() {
		return {
			root: `${this._baseHref}users`
		};
	}


}
