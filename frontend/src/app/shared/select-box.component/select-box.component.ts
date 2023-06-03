import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from "@angular/core";
import { InputComponent } from "../input/input.component";
import { normalFixedPosition, POSITION_FUNCTION } from "../position"
import { ListItem, TemplateUtil } from "../../core.module/utils/template"

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{ provide: InputComponent, useExisting: SelectBoxComponent },
		{ provide: POSITION_FUNCTION, useValue: normalFixedPosition },
	],
	selector: "app-select-box",
	styleUrls: ["./select-box.component.css"],
	templateUrl: "./select-box.component.html"
})
export class SelectBoxComponent extends InputComponent<any> implements OnChanges, AfterContentInit {
	@Input() public active = true;
	@Input("appDataSource") public dataSource?: IterableIterator<ListItem> | HTMLElement;
	@Input("appDataSourceOptions") public dataSourceOptions: any;
	@ContentChild("selectValueTemplate", { static: false }) public valueTemplate: TemplateRef<any> | undefined;
	@ContentChild("selectItemsTemplate", { static: false }) public itemsTemplate: TemplateRef<any> | undefined;
	@ViewChild("selectValueTemplate", { read: TemplateRef, static: true }) public defaultValueTemplate: TemplateRef<any> | undefined;
	@ViewChild("selectItemsTemplate", { read: TemplateRef, static: true }) public defaultItemsTemplate: TemplateRef<any> | undefined;
	public readonly model: {
		filteredItems$: Observable<ListItem[]>;
		isExpanded: boolean;
		items$: Observable<Map<any, string>>;
		selectedItem$: Observable<ListItem>;
		textValue$: Observable<string | undefined>;
	};
	public filter$$ = new BehaviorSubject<string>("");
	private value$$ = new BehaviorSubject<SelectBoxComponent["value"]>(null);
	private items$$ = new BehaviorSubject<Map<any, string>>(new Map());
	@ViewChild("input", { static: false }) private input: ElementRef<HTMLInputElement> | undefined;

	constructor(elementRef: ElementRef, private readonly cdr: ChangeDetectorRef) {
		super(elementRef);
		const selectedItem$ = combineLatest([this.value$$, this.items$$]).pipe(
			map(element => ({ value: element[0], items: element[1] })),
			map(element => {
				const text = element.items.has(element.value)
					? element.items.get(element.value)
					: (element.value === null || element.value === undefined ? "" : "?");
				return [element.value, text] as ListItem;
			})
		);

		const textValue$ = selectedItem$.pipe(map(e => e[1]));

		const filteredItems$ = combineLatest([this.items$$, this.filter$$]).pipe(
			map(element => ({ items: Array.from(element[0]), filter: element[1]?.toLowerCase() })),
			map(element => element.items.filter(item => item[1]?.toLowerCase().includes(element.filter)))
		);

		this.model = {
			filteredItems$,
			isExpanded: false,
			items$: this.items$$.asObservable(),
			selectedItem$,
			textValue$,
		};
	}

	public ngOnChanges(changes: SimpleChanges) {
		if (changes["dataSource"]) {
			this.items$$.next(this.getItemList());
		}
		if (changes["value"])
			this.value$$.next(changes["value"].currentValue);
	}

	public ngAfterContentInit() {
		if (!this.valueTemplate)
			this.valueTemplate = this.defaultValueTemplate;
		if (!this.itemsTemplate)
			this.itemsTemplate = this.defaultItemsTemplate;
		this.cdr.detectChanges();
		this.value$$.next(this.value);
	}

	public expand(expand: boolean) {
		if (!this.active) return;
		this.model.isExpanded = expand;
		(this.elementRef.nativeElement.parentElement.parentElement.parentElement as HTMLElement).style.zIndex = "4";
		this.cdr.detectChanges();
		if (this.model.isExpanded) {
			if (this.input && this.input.nativeElement)
				this.input.nativeElement.focus();
		} else {
			(this.elementRef.nativeElement.parentElement.parentElement.parentElement as HTMLElement).style.zIndex = "";
			this.filter$$.next("");
		}
	}

	public override setInteractiveValue(value: SelectBoxComponent["value"]) {
		super.setInteractiveValue(value);
		this.cdr.detectChanges();
		this.value$$.next(value);
	}

	public override setValue(value: SelectBoxComponent["value"]) {
		super.setValue(value);
		this.cdr.detectChanges();
		this.value$$.next(value);
	}

	public getIdentity(_: never, item: any) {
		return item[0];
	}

	private getItemList() {
		if (this.dataSource instanceof HTMLElement)
			return TemplateUtil.getMap(this.dataSource, this.dataSourceOptions && this.dataSourceOptions.id);

		const itemMap = new Map<any, string>();

		if (this.dataSource) {
			for (const item of this.dataSource) {
				if (item && !this.dataSourceOptions) itemMap.set(item[0], item[1]?.toString());
				if (item && this.dataSourceOptions) itemMap.set(item, item[1]?.toString());
			}
		}
		return itemMap;
	}
}
