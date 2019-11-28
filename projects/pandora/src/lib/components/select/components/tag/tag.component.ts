import { Component, Input, EventEmitter, OnChanges, SimpleChanges, SimpleChange, Output } from '@angular/core';
import { IconsService } from './../../../../services/icons/icons.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Tag } from './tag.model';

@Component({
    selector: 'pan-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnChanges {
    private _id: string | number;
    private _label: string = '';
    @Output()
    public readonly deleteTag: EventEmitter<Tag> = new EventEmitter<Tag>();

    constructor(private _iconsService: IconsService) {}

    ngOnChanges(changes: SimpleChanges) {
        this.validateLabelAndId(changes.label, changes.id);
    }

    @Input()
    set id(id: string | number) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    @Input()
    set label(label: string) {
        this._label = label;
    }

    get label() {
        return this._label;
    }

    public getCloseIcon(): IconDefinition {
        return this._iconsService.getIcon('times');
    }

    public deleteThisTag(): void {
        this.deleteTag.emit({ id: this._id, label: this._label } as Tag);
    }

    private validateLabelAndId(label: SimpleChange, id: SimpleChange): void {
        if (!label || !id) {
            throw new Error('The inputs named label and id are required.');
        }
    }
}