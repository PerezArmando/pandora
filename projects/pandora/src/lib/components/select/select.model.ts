type SelectionMode = 'single' | 'multi';

const DEFAULT_WIDTH_IN_PIXELS: string = '200px';
const SINGLE: SelectionMode = 'single';
const MULTI: SelectionMode = 'multi';

interface Option {
	id: number | string;
	label: string;
	selected?: boolean;
	icon?: string;
	disabled?: boolean;
}

export { SINGLE, MULTI, DEFAULT_WIDTH_IN_PIXELS, SelectionMode, Option };