import {
	Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output
} from "@angular/core";

@Directive()

export abstract class InputComponent<T> {
	@Input() public label?: string;
	@Input() public value?: T | null;
	@Output() public valueChange = new EventEmitter<T | null>();
	@HostBinding("class.focus") public hasFocus = false;
	// @HostBinding("attr.tabindex") public tabIndex = -1;

	constructor(public elementRef: ElementRef) { }

	// tslint:disable
	// public onFocusChange(_: boolean) { }

	/**
	 * Use ONLY to update the control value as a result of user interaction directly to THIS control.
	 */
	public setInteractiveValue(value: T | null) {
		if (value !== this.value) {
			this.value = value;
			this.valueChange.emit(value);
		}
	}

	public setValue(value: T | null) {
		this.value = value;
	}

	@HostListener("focusin")
	public onFocus() {
		if (this.hasFocus)
			return;
		this.hasFocus = true;
		// this.onFocusChange(this.hasFocus);
	}

	@HostListener("focusout", ["$event"])
	public onBlur($event: FocusEvent) {
		if (this.elementRef.nativeElement && this.elementRef.nativeElement.contains($event.relatedTarget))
			return;

		this.hasFocus = false;
		// this.onFocusChange(this.hasFocus);
	}

	@HostBinding("class.empty")
	public get isEmpty() {
		return !this.value;
	}
}