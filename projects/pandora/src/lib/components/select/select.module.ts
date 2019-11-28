import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [SelectComponent],
	imports: [CommonModule, FontAwesomeModule],
	exports: [SelectComponent]
})
export class SelectModule {}
