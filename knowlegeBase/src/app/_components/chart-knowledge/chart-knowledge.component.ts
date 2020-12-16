import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-chart-knowledge",
  templateUrl: "./chart-knowledge.component.html",
  styleUrls: ["./chart-knowledge.component.css"],
})
export class ChartKnowledgeComponent implements OnInit, OnDestroy {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels: string[] = []; //['Net.Core','Css','Angular','SQL','Oracle', 'c#'];
  public barChartType: string = "bar";
  public barChartLegend: boolean = true;

  public barChartData: any[] = [];
  //{data: [8,2,3], label: 'Nivel'},
  //];
  listaConocimiento: any[];
  subcription: Subscription;

  constructor(private userService: UserService) {}

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  ngOnInit() {
    this.subcription = this.userService
      .getConocimientos(JSON.parse(localStorage.getItem("currentUser")).id)
      .subscribe((data: any) => {
        this.listaConocimiento = data;
        this.getLevelKnowledge();
      });
  }

  getLevelKnowledge() {
    const data = [];
    this.listaConocimiento.forEach((x) => {
      this.barChartLabels.push(x.conocimiento.nombre);
      data.push(x.nivel);
    });

    data.push(5);
    data.push(0);
    this.barChartData.push({ data: data, label: "Nivel", type: 'bar', 
                              options: { tension:0.0, bezierCurve:false },
                              borderWidth: 1,
                              tension:0.25,
                              backgroundColor:['rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)'],borderColor:['rgba(255, 99, 132, 1)','rgba(255, 99, 132, 1)','rgba(255, 99, 132, 1)','rgba(255, 99, 132, 1)'], });
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
