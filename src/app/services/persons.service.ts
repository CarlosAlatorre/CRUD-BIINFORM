import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Person} from '../interfaces/person';

@Injectable()
export class PersonsService {

    constructor(private db: AngularFireDatabase) {
    }

    addPerson(person:Person){
        let key:string = this.db.list('personas').push(person).key;
        this.addKeyToPerson(key);
    }

    addKeyToPerson(key:string){
        this.db.list('personas').update(key, {key: key})
    }

    removePerson(key:string){
        this.db.list('personas').remove(key);
    }

    updatePerson(person:Person){
        this.db.list('personas').update(person.key, person)
    }

    getPersons(){
        return this.db.list('personas').valueChanges();
    }

    getPerson(key:string){
        return new Promise(resolve => {
            this.db.object('personas/' + key)
                .valueChanges()
                .subscribe((response:Person)=>{
                    resolve(response);
                })
        })
    }
}
