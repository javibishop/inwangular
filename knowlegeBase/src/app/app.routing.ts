import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { LoginComponent } from './login';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'knowledge/:id', component: KnowledgeComponent, canActivate: [AuthGuard] },
    { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);