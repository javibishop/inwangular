
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Componente1Component } from './componente1/componente1.component';
import { Componente2Component } from './componente2/componente2.component';
import { TestChangeDetectorComponent } from './test-change-detector/test-change-detector.component';
import { TestProvidersComponent } from './test-providers/test-providers.component';

const routes: Routes = [
    { path: 'componente1', component: Componente1Component },
    { path: 'componente2', component: Componente2Component },
    // esto es para la carga lazy del modulo de usuarios.
    { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosModule' },
     { path: 'testProviders', component: TestProvidersComponent },
     { path: 'testChangeDetector', component: TestChangeDetectorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}