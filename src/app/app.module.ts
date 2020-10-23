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
<<<<<<< HEAD
import { RandomService } from './service/random.service';
import { ComponenteCiclo1Component } from './componente-ciclo1/componente-ciclo1.component';
import { ComponenteCiclo2Component } from './componente-ciclo2/componente-ciclo2.component';
import { TestChangeDetectorComponent } from './test-change-detector/test-change-detector.component';
=======
import { UsuarioService } from './usuarios/usuario.service';
>>>>>>> fa71984c2dbad3fd4c41f6d0d38fe1de61085c74


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
      apiKey: '',
      libraries: ['places']
    })
  ],
<<<<<<< HEAD
  providers: [RandomService],
=======
  providers: [UsuarioService],
>>>>>>> fa71984c2dbad3fd4c41f6d0d38fe1de61085c74
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    console.log('modulo principal');
  }
 }
