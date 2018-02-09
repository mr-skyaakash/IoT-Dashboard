import { trigger, transition, style, animate, state, query, group } from "@angular/animations";

export const SlideLeftAnimation = 
    trigger('slideLeftAnimation', [
        transition('login => signup', [    
        query(':enter, :leave', style({ position: 'fixed', width:'100%' }),
        { optional: true}),
        group([ 
            query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.8s ease-in-out', style({ transform: 'translateX(0%)' }))
            ], { optional: true}),
            query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.8s ease-in-out', style({ transform: 'translateX(-100%)' }))],
        { optional: true}),
        ])
        ]),
        transition('signup => login', [    
            query(':enter, :leave', style({ position: 'fixed', width:'100%' }),
            { optional: true}),
            group([ 
                query(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('0.8s ease-in-out', style({ transform: 'translateX(0%)' }))
                ], { optional: true}),
                query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.8s ease-in-out', style({ transform: 'translateX(100%)' }))],
            { optional: true}),
            ])
            ]),
        transition('login => *', [    
            query(':enter, :leave', style({ position: 'fixed', width:'100%' }),
            { optional: true}),
            group([ 
                query(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('0.8s ease-in-out', style({ transform: 'translateX(0%)' }))
                ], { optional: true}),
                query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.8s ease-in-out', style({ transform: 'translateX(-100%)' }))],
            { optional: true}),
            ])
            ])
    ])