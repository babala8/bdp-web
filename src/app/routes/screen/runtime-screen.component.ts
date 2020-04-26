import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { Runtime } from 'inspector';
import { StandardCompRepo } from '@data-studio/component/standard';
import { CustomCompRepo } from '@data-studio/component/custom';
import { Runtime } from '@data-studio/runtime';
import { HttpClient } from '@angular/common/http';
import { standardGeneratorRepo } from '@data-studio/generator/standard';
import { IFileStructure, IPage } from '@data-studio/shared';
import { mockGeneratorRepo } from '@data-studio/generator/mock';

@Component({
  template: `
    <div id="screen"></div>`,
  styles: [`
  :host ::ng-deep .report-region {
    position: relative;
    padding: 0;
    min-width: 100%;
    min-height: 100%;
  }

  `]
})
export class RuntimeScreenComponent implements OnInit, AfterViewInit {

  _page: IPage;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const runtime = Runtime.getInstance();

    runtime.addComponentRepository([StandardCompRepo, CustomCompRepo]);
    runtime.addGeneratorRepository([standardGeneratorRepo, mockGeneratorRepo]);

    this.http.get('assets/screen/sample.json').subscribe(file => {
      const page = this._page = runtime.open(file as IFileStructure);
      (page as any).adapt({
        width: window.innerWidth,
        height: window.innerHeight
      });

      setTimeout(() => {
        console.log(window.innerHeight, window.innerWidth);
        (document.getElementsByClassName("report-region")[0] as any).style.width = window.innerWidth + 'px';
        (document.getElementsByClassName("report-region")[0] as any).style.height = window.innerHeight + 'px';
      });

      document.getElementById('screen').append(page.element);
      document.getElementById('screen').addEventListener('click', () => {
        (document.getElementsByClassName("report-region")[0] as any).style.width = window.innerWidth + 'px';
        (document.getElementsByClassName("report-region")[0] as any).style.height = window.innerHeight + 'px';
        console.log({
          width: window.innerWidth,
          height: window.innerHeight
        });
      });

      document.getElementById('screen').addEventListener('dblclick', () => {

        (page as any).adapt({
          width:window.screen.width,
          height:window.screen.height
        });
        page.enterFullScreen();

      });
    });
  }
  getWindowSize() : {width: number; height: number} {
    return {
      width:window.screen.width,
      height:window.screen.height
    }
  }
}
