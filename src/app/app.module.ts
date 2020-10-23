import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './rutas';
import { Componente1Component } from './componente1/componente1.component';
import { Componente2Component } from './componente2/componente2.component';
import { RandomComponent } from './random/random.component';
import { TestProvidersComponent } from './test-providers/test-providers.component';
import { RandomService } from './service/random.service';
import { ComponenteCiclo1Component } from './componente-ciclo1/componente-ciclo1.component';
import { ComponenteCiclo2Component } from './componente-ciclo2/componente-ciclo2.component';
import { TestChangeDetectorComponent } from './test-change-detector/test-change-detector.component';


@NgModule({
  declarations: [
    AppComponent,
    Componente1Component,
    Componente2Component,
    TestProvidersComponent,
    RandomComponent,
    ComponenteCiclo1Component,
    ComponenteCiclo2Component,
    TestChangeDetectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB9NKtbEfyh8g8icUvJnx7RFZR6TQADKSY',
      libraries: ['places']
    })
  ],
  providers: [RandomService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    console.log('modulo principal');
  }
 }
