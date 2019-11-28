import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';
import { TagComponent } from './components/tag/tag.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsService } from './../../services/icons/icons.service';

@NgModule({
	declarations: [SelectComponent, TagComponent],
	imports: [CommonModule, FontAwesomeModule],
	exports: [SelectComponent],
	providers: [IconsService]
})
export class SelectModule {}
