import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ScreenComponent} from './screen.component';
import { RuntimeScreenComponent } from './runtime-screen.component';

export const routes: Routes = [
    {
        path: '',
        component: RuntimeScreenComponent
    }
];

export const ScreenRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
