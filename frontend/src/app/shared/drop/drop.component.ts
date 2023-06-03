import {
	AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef
} from "@angular/core";


@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: "app-drop",
	styleUrls: ["./drop.component.css"],
	template: "<ng-content></ng-content>"
})
export class DropComponent implements AfterViewChecked {
	constructor(
		private readonly elementRef: ElementRef<HTMLElement>,
	) { }

	public ngAfterViewChecked() {
		this.elementRef.nativeElement.style.width = this.elementRef.nativeElement.parentElement!.getBoundingClientRect().width + "px";
	}
}