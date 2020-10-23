import { Component, Injectable } from '@angular/core';
import { TestProvidersModule } from '../test-providers/test-providers.module';

@Injectable({
  providedIn: 'root',
})
export class RandomService {
  random: string;

  constructor() {
    this.random = Math.random().toFixed(1);
  }
}
