import {Component} from '@angular/core';


// 该组件所包含的正反两面的组件没有交互关系
@Component({
    selector: 'turn-over',
    // language=HTML
    template: `
        <div class="container">
            <div class="canvas" [ngClass]="{'transform':flipped}" (click)="setFlipped($event)">
                <div class="front">
                    <ng-content select="[id=positive]"></ng-content>
                </div>
                <div class="back">
                    <ng-content select="[id=reverse]"></ng-content>
                </div>
            </div>
        </div>
    `,
    // language=CSS
    styles: [`
        .container {
            height: 100%;
            position: relative;
            perspective: 1500px;
        }

        .canvas {
            position: absolute;
            width: 100%;
            height: 100%;
            transform-origin: 50% 50% 0;
            transform-style: preserve-3d;
        }

        .canvas .front {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            z-index: 2;
            transition: transform 1s ease 0s;
        }

        .canvas .back {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            backface-visibility: hidden;
            transform: rotateY(180deg);
            transition: transform 1s ease 0s;
        }

        .canvas.transform .front {
            transform: rotateY(180deg);
        }

        .canvas.transform .back {
            transform: rotateY(360deg);
        }




    `]
})
export class TurnOverComponent {


    flipped = false;

    constructor() {

    }

    setFlipped($event) {
        console.log('被点击');
        // 如果点击的是Button,则不翻转
            if (window['event']['target']['localName'] === 'change-theme.less')
            return;
        this.flipped = !this.flipped;
    }

}


