import { ControlValueAccessor } from "@angular/forms";
/* eslint-disable @typescript-eslint/no-explicit-any */

export abstract class CommonBoxValueAccessor<T> implements ControlValueAccessor {
	public value: T | null = null;

	protected onChange?: (...args: any[]) => void;
	protected onTouched?: (...args: any[]) => void;

	public writeValue(value: T | null): void {
		this.value = value;
	}

	public registerOnChange(fn: (...args: any[]) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: (...args: any[]) => void): void {
		this.onTouched = fn;
	}
}