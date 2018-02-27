import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {HomeComponent} from '../pages/home/home.component';
import {ListPersonsComponent} from '../pages/list-persons/list-persons.component';

const LAYOUT_ROUTES: Routes = [
    { path: '', component: LayoutComponent, children: [
        { path: '', redirectTo: 'persons', pathMatch: 'full' },
        { path: 'persons', component: ListPersonsComponent },
    ]}
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);
