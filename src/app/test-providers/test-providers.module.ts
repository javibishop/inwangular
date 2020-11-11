import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RandomComponent } from '../random/random.component';


@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class TestProvidersModule {
  constructor() {
    console.log("modulo usuarios adsfsdfsdf");
  }
}
