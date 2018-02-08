import { trigger, transition, style, animate, state } from "@angular/animations";
import {  } from "@angular/core";

export const SlideUpAnimation = 
    trigger('slideUpAnimation', [
        state('*', style({})),

        // transition(':enter', [
        //     style({ opacity: 0 }),
        //     animate('1s', style({ opacity: 1 }))


        // ]),
        transition(':enter', [
 
            // styles at start of transition
            style({
                // start with the content positioned off the right of the screen,
                // -400% is required instead of -100% because the negative position adds to the width of the element
                transform: 'translateY(100%)',
                
 
                // start with background opacity set to 0 (invisible)
                // backgroundColor: 'rgba(0, 0, 0, 0)'
            }),
 
            // animation and styles at end of transition
            animate('1s ease-in-out', style({
                // transition the right position to 0 which slides the content into view
                transform: 'translateY(0px)',
                // transition the background opacity to 0.8 to fade it in
                // backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }))
        ]),
 
        // route 'leave' transition
        transition(':leave', [
            // animation and styles at end of transition
            animate('.5s ease-in-out', style({
                // transition the right position to -400% which slides the content out of view
                // right: '-400%',
                transform: 'translateY(-100%)',
 
                // transition the background opacity to 0 to fade it out
                // backgroundColor: 'rgba(0, 0, 0, 0)'
            }))
        ])
    ]);