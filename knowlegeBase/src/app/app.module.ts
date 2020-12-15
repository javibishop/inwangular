import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { GenericCardsComponent } from './generic-cards/generic-cards.component';
import { FlipCardComponent } from './generic-cards/flipcard/flipcard.component';
import { ProfileComponent } from './profile/profile.component';
import { StarRatingComponent } from './_components/star-rating/star-rating.component';
import { ChartsModule } from 'ng2-charts';
import { ChartKnowledgeComponent } from './_components/chart-knowledge/chart-knowledge.component';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        routing,
        ChartsModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        KnowledgeComponent,
        GenericCardsComponent,
        FlipCardComponent,
        ProfileComponent,
        StarRatingComponent,
        ChartKnowledgeComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }