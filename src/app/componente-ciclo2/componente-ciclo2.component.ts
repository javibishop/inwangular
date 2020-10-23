import { BoundElementPropertyAst } from "@angular/compiler";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-componente-ciclo2",
  templateUrl: "./componente-ciclo2.component.html",
  styleUrls: ["./componente-ciclo2.component.css"],
})
export class ComponenteCiclo2Component implements OnInit {
  @Input() comu: Boolean;

  constructor() {}

  ngOnInit() {}

  ngDoCheck(): void {
    console.log("Do check");
  }
}
