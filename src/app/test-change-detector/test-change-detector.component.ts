import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { of } from "rxjs/internal/observable/of";

@Component({
  selector: "app-test-change-detector",
  templateUrl: "./test-change-detector.component.html",
  styleUrls: ["./test-change-detector.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestChangeDetectorComponent implements OnInit {
  numberOfTicks = 0;
  number = 1;
  myObservable = of(1, 2, 3, 4, 5);


  constructor(private ref: ChangeDetectorRef) {
    setInterval(() => {
      this.numberOfTicks++;
      // require view to be updated
      // this.ref.markForCheck();
    }, 1000);
  }

  ngOnInit() {

    this.myObservable.subscribe(
      x => this.number = this.number + x,
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );
  }

  butonchange() {
    this.number++;
    console.log("Entre" + this.number);
  }
}
