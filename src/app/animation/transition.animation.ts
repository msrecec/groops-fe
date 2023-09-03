import {animate, group, keyframes, state, style, transition, trigger} from "@angular/animations";

export const transitionAnimation = trigger('transitionAnimation', [
    state('in', style({
        transform: 'translateX(0)'
    })),
    transition('void => *', [
        animate(500, keyframes([
            style({
                transform: 'translateX(-100px)',
                offset: 0,
            }),
            style({
                transform: 'translateX(-80px)',
                offset: 0.2
            }),
            style({
                transform: 'translateX(-50px)',
                offset: 0.5
            }),
            style({
                transform: 'translateX(-20px)',
                offset: 0.8
            }),
            style({
                transform: 'translateX(0px)',
                offset: 1
            })
        ]))
    ])
])
