import {Component, OnInit} from '@angular/core';
import {PersonsService} from '../../services/persons.service';
import {Person} from '../../interfaces/person';
import {BsModalService} from 'ngx-bootstrap';
import {EditPersonComponent} from '../../modals/edit-person/edit-person.component';
import {Globals} from '../../statics/globals';
import {ValidationService} from '../../services/validation.service';
import {AlertService} from '../../services/alert.service';
import {Gender} from '../../enums/gender.enum';

@Component({
    selector: 'app-list-persons',
    templateUrl: './list-persons.component.html',
    styleUrls: ['./list-persons.component.scss']
})
export class ListPersonsComponent implements OnInit {

    persons:Person[] = [];
    newPerson: Person = {
        nombre:'',
        apellido:'',
        sexo:Gender.MALE,
        edad: null,
        lugarNacimiento: '',
        key:''
    };
    gender:any = Gender;
    showGrowl:boolean = false;
    growlTitle:string;

    constructor(private _personService: PersonsService,
                private _modalService:BsModalService,
                private _alertService:AlertService) {
    }

    ngOnInit() {
        this.getPersons();
    }

    getPersons(){
        this._personService.getPersons().subscribe((response:Person[])=>{
            this.persons = response;
        })
    }

    addPerson(){
        if(ValidationService.errorInField(this.newPerson.nombre)) return this._alertService.error('Falta agregar el nombre', '');
        if(ValidationService.errorInField(this.newPerson.apellido)) return this._alertService.error('Falta agregar el apellido', '');
        if(ValidationService.errorInField(this.newPerson.edad)) return this._alertService.error('Falta agregar la edad', '');
        if(ValidationService.errorInField(this.newPerson.lugarNacimiento)) return this._alertService.error('Falta agregar el lugar de nacimiento', '');

        this._personService.addPerson(this.newPerson);
        this.clearInputs();
        this.openGrowl('Persona agregada!')
    }

    clearInputs(){
        this.newPerson = {
            nombre:'',
            apellido:'',
            sexo:Gender.MALE,
            edad: null,
            lugarNacimiento: '',
            key:''
        };
    }

    showEditPersonModal(key:string){
        sessionStorage.setItem('personKey', key);
        this._modalService.show(EditPersonComponent, Object.assign({}, Globals.optionModalSm, { class: 'gray modal-lg' }));
    }

    removePerson(key:string){
        this._personService.removePerson(key);
        this._alertService.success('Persona borrada!', '');
    }

    openGrowl(title:string){
        this.growlTitle = title;
        this.showGrowl = true;

        setTimeout(()=>{
            this.showGrowl = false;
        }, 5000);
    }
}
