import { InjectionToken } from "@angular/core";


export interface DatosConfiguracion {
    host: string,
    configA: string ,
    configB: string
}

export const CONFIG_TOKEN2 = new InjectionToken<DatosConfiguracion>('Configuracion global', {
    providedIn: 'root',
    factory: () => {
        return {host: 'host1', configA: 'ConfigA', configB: 'ConfigB' };
    }
  });


export const CONFIG_TOKEN = new InjectionToken<DatosConfiguracion>("host");

export let configDataServiceFactory = () => {
    return {host: 'host', configA: 'ConfigA', configB: 'ConfigB'};
};

export let configDataServiceProvider =
{
    provide: CONFIG_TOKEN,
    useFactory: configDataServiceFactory
};