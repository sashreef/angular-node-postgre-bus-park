import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: "app-icon",
	styleUrls: ["./icon.component.css"],
	template: "<ng-content></ng-content>"
})
export class IconComponent { }