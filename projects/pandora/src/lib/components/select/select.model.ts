type SelectionMode = 'single' | 'multi';

const SINGLE: SelectionMode = 'single';
const MULTI: SelectionMode = 'multi';

interface Option {
	id: number | string;
	label: string;
	selected?: boolean;
	icon?: string; 
	disabled?: boolean;
}

export { SINGLE, MULTI, SelectionMode, Option };