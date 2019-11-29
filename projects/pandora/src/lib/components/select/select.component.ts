import { Component, Input, EventEmitter, OnChanges, SimpleChanges, Output } from '@angular/core';
import { Option, SelectionMode, SINGLE } from './select.model';
import { IconsService } from './../../services/icons/icons.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Tag } from './components/tag/tag.model';

@Component({
	selector: 'pan-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnChanges {
	private _isOpen: boolean = false;
	private _options: Option[] = [];
	private _selectionMode: SelectionMode = SINGLE;
	private _noOptionsMsg: string = 'No options to list.';
	@Output()
	private readonly currSelectedOption: EventEmitter<Option> = new EventEmitter<Option>();
	private _disabled: boolean = false;
	private _hasSearch: boolean = false;

	constructor(private readonly _iconsService: IconsService) {}

	ngOnChanges(changes: SimpleChanges) {
		this.validateQtySelectedOptions(changes.options.currentValue);
	}

	@Input()
	set hasSearch(hasSearch: boolean) {
		this._hasSearch = hasSearch;
	}

	get hasSearch() {
		return this._hasSearch;
	}

	@Input()
	set disabled(disabled: boolean) {
		this._disabled = disabled;
	}

	get disabled() {
		return this._disabled;
	}

	@Input()
	set options(options: Option[]) {
		this._options = options;
	}

	get options() {
		return this._options;
	}

	get isOpen() {
		return this._isOpen;
	}

	@Input()
	set selectionMode(selectionMode: SelectionMode) {
		this._selectionMode = selectionMode;
	}

	get selectionMode() {
		return this._selectionMode;
	}

	@Input()
	set noOptionsMsg(noOptionsMsg: string) {
		this._noOptionsMsg = noOptionsMsg;
	}

	get noOptionsMsg() {
		return this._noOptionsMsg;
	}

	get iconService() {
		return this._iconsService;
	}

	private validateQtySelectedOptions(options: Option[]) {
		if (this._selectionMode === SINGLE) {
			const selectedOptions: Option[] = options.filter((option: Option) => !!option.selected);
			if (!!selectedOptions && selectedOptions.length > 1) {
				throw new Error('Only one option MUST be selected at any given time.');
			}
		}
	}

	public isSingleSelection(): boolean {
		return this._selectionMode === SINGLE;
	}

	public toggle(): void {
		if (!this._disabled) {
			this._isOpen = !this._isOpen;
		}
	}

	public close(): void {
		this._isOpen = false;
	}

	public selectedOption(): Option {
		return this._options.find((option: Option) => !!option.selected);
	}

	public selectedOptions(): Option[] {
		return this._options.filter((option: Option) => !!option.selected);
	}

	public getIcon(iconName: string): IconDefinition {
		return this._iconsService.getIcon(iconName);
	}

	public hasOptions(): boolean {
		return !!this._options && this._options.length > 0;
	}

	public selectOption(newSelectedOption: Option): void {
		if (this.isSingleSelection()) {
			this.singleModeSelection(newSelectedOption);
			this.toggle();
		} else {
			this.multiModeSelection(newSelectedOption);
		}
		this.currSelectedOption.emit(newSelectedOption);
	}

	private multiModeSelection(newSelectedOption: Option): void {
		newSelectedOption.selected = true;
	}

	private singleModeSelection(newSelectedOption: Option): void {
		const currSelectedOption: Option = this._options.find((option: Option) => !!option.selected);

		if (!!currSelectedOption) {
			currSelectedOption.selected = false;
		}

		newSelectedOption.selected = true;
	}

	public deleteTag(tag: Tag): void {
		const option: Option = this._options.find((option: Option) => option.id === tag.id);

		if (!!option) {
			option.selected = false;
		}
	}

	public focus(): void {
		
	}
}
