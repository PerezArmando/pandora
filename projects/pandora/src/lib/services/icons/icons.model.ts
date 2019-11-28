import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faSortDown, faSortUp, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const icons: Map<string, IconDefinition> = new Map<string, IconDefinition>([
	['sort-down', faSortDown],
	['sort-up', faSortUp],
	['times-circle', faTimesCircle]
]);

export default icons;
