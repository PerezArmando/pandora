import { Component, Input, EventEmitter } from '@angular/core';
import { Option, SelectionMode } from './select.model';
import { IconsService } from './../../services/icons/icons.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'pan-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	providers: [IconsService]
})
export class SelectComponent {
	private _isOpen: boolean = false;
	private _options: Option[] = [];
	private _selectionMode: SelectionMode = 'single';
	private _noOptionsMsg: string = 'No options available.';
	private _minWidthInPx: string = '200px';
	private _currSelectedOption: EventEmitter<Option> = new EventEmitter<Option>();

	constructor(private readonly _iconsService: IconsService) {}

	@Input()
	set minWidthInPx(minWidthInPx: string) {
		this._minWidthInPx = minWidthInPx;
	}

	get minWidthInPx() {
		return this._minWidthInPx;
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

	public toggle(): void {
		this._isOpen = !this._isOpen;
	}

	public selectedOption(): Option {
		return this._options.find((option: Option) => !!option.selected);
	}

	public getIcon(iconName: string): IconDefinition {
		return this._iconsService.getIcon(iconName);
	}

	public hasOptions(): boolean {
		return !!this._options && this._options.length > 0;
	}

	public selectOption(newSelectedOption: Option): void {
		const currSelectedOption: Option = this._options.find((option: Option) => !!option.selected);

		if (!!currSelectedOption) {
			currSelectedOption.selected = false;
		}

		newSelectedOption.selected = true;
		this.toggle();
		this._currSelectedOption.emit();
	}
}
