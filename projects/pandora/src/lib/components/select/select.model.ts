export type SelectionMode = 'single' | 'multi';

export interface Option {
	id: number | string;
	label: string;
	selected?: boolean;
	icon?: string;
}
