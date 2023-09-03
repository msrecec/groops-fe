import {animate, group, keyframes, state, style, transition, trigger} from "@angular/animations";

export const transitionAnimation = trigger('transitionAnimation', [
    transition('void => *', [
        animate(500, keyframes([
            style({
                opacity: 0,
            }),
            style({
                opacity: 0.1,
            }),
            style({
                opacity: 0.2,
            }),
            style({
                opacity: 0.3,
            }),
            style({
                opacity: 0.4,
            }),
            style({
                opacity: 0.5,
            }),
            style({
                opacity: 0.6,
            }),
            style({
                opacity: 0.7,
            }),
            style({
                opacity: 0.8,
            }),
            style({
                opacity: 0.9,
            }),
            style({
                opacity: 1,
            })
        ]))
    ])
])
