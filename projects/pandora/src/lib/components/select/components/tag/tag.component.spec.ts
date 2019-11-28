import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsService } from './../../../../services/icons/icons.service';
import { TagComponent } from './tag.component';
import { Tag } from './tag.model';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SimpleChanges, SimpleChange } from '@angular/core';

describe('TagComponent', () => {
    let fixture: ComponentFixture<TagComponent>;
    let component: TagComponent;
    let componentHtml: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TagComponent],
            imports: [CommonModule, FontAwesomeModule],
            providers: [IconsService]
        });
    });

    it('should be created.', () => {
        // ARRANGE
        fixture = TestBed.createComponent(TagComponent);
        component = fixture.componentInstance;
        componentHtml = fixture.nativeElement;

        // ASSERT
        expect(component).toBeTruthy();
        expect(componentHtml).toBeTruthy();
    });

    it('should be deleted.', (done: DoneFn) => {
        // ARRANGE
        fixture = TestBed.createComponent(TagComponent);
        component = fixture.componentInstance;
        component.id = 1;
        component.label = 'A label';

        fixture.detectChanges();

        component.deleteTag.subscribe((tag: Tag) => {
            // ASSERT
            expect(tag.id).toEqual(1);
            expect(tag.label).toEqual('A label');
            done();
        });

        // ACT
        component.deleteThisTag();
    });

    it('should return \'times\' icon.', () => {
        // ARRANGE
        fixture = TestBed.createComponent(TagComponent);
        component = fixture.componentInstance;
        const iconsService: IconsService = TestBed.get(IconsService);

        // ACT
        const closeIcon: IconDefinition = component.getCloseIcon();

        // ASSERT
        expect(closeIcon).toBeTruthy();
        expect(iconsService.getIcon('times').iconName).toEqual(closeIcon.iconName);
    });

    it('should throw an error if no id nor label is present.', () => {
        // ARRANGE
        fixture = TestBed.createComponent(TagComponent);
        component = fixture.componentInstance;

        // ACT
        expect(function () {
            component.validateLabelAndId(null, null);
        })
        .toThrowError('The inputs named label and id are required.');
    });

    
    it('should throw an error if no id is present.', () => {
        // ARRANGE
        fixture = TestBed.createComponent(TagComponent);
        component = fixture.componentInstance;

        // ACT
        expect(function () {
            component.validateLabelAndId(null, { currentValue: 'A label' } as SimpleChange);
        })
        .toThrowError('The inputs named label and id are required.');
    });

    it('should throw an error if no label is present.', () => {
        // ARRANGE
        fixture = TestBed.createComponent(TagComponent);
        component = fixture.componentInstance;

        // ACT
        expect(function () {
            component.validateLabelAndId({ currentValue: 1 } as SimpleChange, null);
        })
        .toThrowError('The inputs named label and id are required.');
    });

    it('should NOT throw an error if required params are present.', () => {
        // ARRANGE
        fixture = TestBed.createComponent(TagComponent);
        component = fixture.componentInstance;

        // ACT
        expect(function () {
            component.validateLabelAndId(
                { currentValue: 1 } as SimpleChange,
                { currentValue: 'A label' } as SimpleChange);
        })
        .not.toThrowError('The inputs named label and id are required.');
    });
});