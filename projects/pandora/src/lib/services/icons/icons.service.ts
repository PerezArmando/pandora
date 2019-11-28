import { Injectable } from '@angular/core';
import icons from './icons.model';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Injectable()
export class IconsService {
	public getIcon(iconName: string): IconDefinition {
		return icons.get(iconName);
	}
}
