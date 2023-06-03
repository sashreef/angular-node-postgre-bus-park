import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, ViewChild } from "@angular/core";
import { InputComponent } from "../input/input.component";

export type NumberType = "int" | "float" | "orderNum";

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: InputComponent, useExisting: DateBoxComponent }],
	selector: "app-date-box",
    templateUrl: "./date-box-component.html",
	styleUrls: ["./date-box-component.css"],
})
export class DateBoxComponent extends InputComponent<string | number> {
	@HostBinding("attr.disabled") public get setDisabled(): "" | null {
		return this.isDisabled ? "" : null;
	}
	@Input("appInputType") public inputType?: NumberType;
	@Input() public min?: number;
	@Input() public max?: number;
	@Input() public isDisabled?: boolean;
	@Input() public placeholder?: string;
	@Input() private isUpperCase?: boolean;
	@ViewChild("input", { read: ElementRef, static: false }) public inputRef?: ElementRef<HTMLInputElement>;
	private previousValue = "";

	constructor(
		public override elementRef: ElementRef,
		private readonly cdr: ChangeDetectorRef
	) {
		super(elementRef);
	}

	public focus() {
		this.inputRef?.nativeElement.focus();
		this.hasFocus = true;
	}

	public blur() {
		this.inputRef?.nativeElement.blur();
		this.hasFocus = false;
	}

	public onInput(e: any) {
		switch (this.inputType) {
			case "float": {
				this.validateInputFloat(e);
				break;
			}
			case "int": {
				this.validateInputInt(e, /^[0-9]*$/);
				break;
			}
			case "orderNum": {
				this.validateInputInt(e, /^[a-za-яё0-9\s-]*$/);
				break;
			}
			default: {
				if (this.isUpperCase) {
					e.target.value = e.target.value.toUpperCase();
				}
				this.setInteractiveValue(e.target.value.trim());
			}
		}
	}

	public onInputNumber(value: number) {
		this.setInteractiveValue(value);
	}

	public override setValue(value: DateBoxComponent["value"]) {
		super.setValue(value || "");
		this.cdr.detectChanges();
	}

	public isFinite(value: any) {
		return Number.isFinite(value);
	}

	public validateInputInt(e: any, pattern: RegExp): void {
		if (!pattern.test(e.target.value)) {
			e.target.value = this.previousValue;
		} else {
			this.previousValue = e.target.value;
		}
		this.setInteractiveValue(e.target.value);
	}

	public validateInputFloat(e: any) {
		if (e.data === null) {
			this.setInteractiveValue(e.target.value);
			return;
		}

		const splitters = e.target.value.split("").filter((e: string) => e === "." || e === ",");

		e.target.value = e.target.value.replace(/,/gi, ".");

		if (!Number(e.data) && (![".", ",", "0"].includes(e.data)))
			e.target.value = e.target.value.replace(e.data, "");


		if (e.target.value.length > 1 && splitters.length > 1)
			e.target.value = e.target.value.substr(0, e.target.value.length - 1);


		if (e.target.value.length === 1 && (e.target.value === "." || e.target.value === "," || e.target.value === "0")) {
			e.target.value = "0.";
		}
		this.setInteractiveValue(e.target.value);
	}
}