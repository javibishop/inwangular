
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, Label } from 'chart.js';
import { KnowledgeService } from 'src/app/service/knowledge.service';


@Component({
  selector: 'app-chart-knowledge',
  templateUrl: './chart-knowledge.component.html',
  styleUrls: ['./chart-knowledge.component.css']
})
export class ChartKnowledgeComponent implements OnInit {

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = []//['Net.Core','Css','Angular','SQL','Oracle', 'c#'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [];   
   //{data: [8,2,3], label: 'Nivel'},   
 //];
  listaConocimiento: any[];

  constructor(private knowledgeService: KnowledgeService) { }

  ngOnInit() {

    this.knowledgeService.getById(JSON.parse(localStorage.getItem('currentUser')).id).subscribe((data: any) =>{
      console.log(data.conocimientos);
      this.listaConocimiento = data.conocimientos;
      this.getLevelKnowledge()
    })    
  }

  getLevelKnowledge() {
    const data= [];
    this.listaConocimiento.forEach(x=> {
      this.barChartLabels.push(x.conocimiento.nombre)
      data.push(x.conocimiento.nivel)
    });

    this.barChartData.push({data: data, label: 'Nivel'});
  }

}
