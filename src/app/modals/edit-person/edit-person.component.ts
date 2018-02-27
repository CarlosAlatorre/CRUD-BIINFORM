import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PersonsService} from '../../services/persons.service';
import {Person} from '../../interfaces/person';
import {Gender} from '../../enums/gender.enum';
import {ValidationService} from '../../services/validation.service';
import {AlertService} from '../../services/alert.service';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
    selector: 'app-edit-person',
    templateUrl: './edit-person.component.html',
    styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnInit {

    person: Person = {
        nombre: '',
        apellido: '',
        sexo: Gender.MALE,
        edad: null,
        lugarNacimiento: '',
        key: ''
    };
    gender: any = Gender;
    @ViewChild('name') nameRef: ElementRef;
    @ViewChild('lastName') lastNameRef: ElementRef;
    @ViewChild('age') ageRef: ElementRef;

    constructor(private _personService: PersonsService,
                private _alertService: AlertService,
                private _modalService: BsModalRef) {
    }

    ngOnInit() {
        this.getPerson(sessionStorage.getItem('personKey'));
    }

    getPerson(personKey: string) {
        this._personService.getPerson(personKey)
            .then((response: Person) => {
                this.person = response;
                this.inputFocus();
            });
    }

    inputFocus() {
        setTimeout(() => {
            this.lastNameRef.nativeElement.focus();
            this.ageRef.nativeElement.focus();
            this.nameRef.nativeElement.focus();
        }, 100);

    }

    editPerson() {
        if (ValidationService.errorInField(this.person.nombre)) return this._alertService.error('Falta agregar el nombre', '');
        if (ValidationService.errorInField(this.person.apellido)) return this._alertService.error('Falta agregar el apellido', '');
        if (ValidationService.errorInField(this.person.edad)) return this._alertService.error('Falta agregar la edad', '');
        if (ValidationService.errorInField(this.person.lugarNacimiento)) return this._alertService.error('Falta agregar el lugar de nacimiento', '');

        this._personService.updatePerson(this.person);
        this._alertService.confirmSuccess('Persona Editada', '')
            .then(() => {
                this.closeModal();
            });
    }

    closeModal() {
        this._modalService.hide();
    }
}
