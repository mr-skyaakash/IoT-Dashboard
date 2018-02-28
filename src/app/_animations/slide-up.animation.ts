import { trigger, transition, style, animate, state, query, group } from '@angular/animations';

export const SlideUpAnimation =
    trigger('slideUpAnimation', [
        transition('void => signup', [
            query(':enter', style({ position: 'fixed', width: '100%', zIndex: '1' }),
            { optional: true}),
            group([
                query(':enter', [
                style({ transform: 'translate3d(-100%,0,0)'}),
                animate('0.8s ease-in-out', style({ transform: 'translate3d(0%,0,0)' }))
                ], { optional: true}),
            ])
            ]),
        transition('login => signup', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: '1' }),
            { optional: true}),
            group([
                query(':enter', [
                style({ transform: 'translate3d(0,100%,0)'}),
                animate('0.8s ease-in-out', style({ transform: 'translate3d(0,0%,0)' }))
                ], { optional: true}),
                query(':leave', [
                style({ transform: 'translate3d(0,0%,0)', zIndex: '-9999' }),
                animate('0.8s ease-in-out', style({ transform: 'translate3d(0,-100%,0)', zIndex: '-9999' }))],
            { optional: true}),
            ])
            ]),
            transition('signup => login', [
                query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: '1' }),
                { optional: true}),
                group([
                    query(':enter', [
                    style({ transform: 'translateY(-100%)', zIndex: '-9999' }),
                    animate('0.8s ease-in-out', style({ transform: 'translateY(0%)', zIndex: '-9999' }))
                    ], { optional: true}),
                    query(':leave', [
                    style({ transform: 'translateY(0%)', zIndex: '1' }),
                    animate('0.8s ease-in-out', style({ transform: 'translateY(100%)', zIndex: '1' }))],
                { optional: true}),
                ])
                ]),
                transition('* => home', [
                    query(':enter, :leave', style({ position: 'fixed', width: '100%' }),
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
                    transition('home => *', [
                        query(':enter, :leave', style({ position: 'fixed', width: '100%' }),
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
            // transition('void => login', [
            //     query(':enter, :leave', style({ position: 'fixed', width:'100%' }),
            //     { optional: true}),
            //     group([
            //         query(':enter', [
            //         style({ transform: 'translateY(100%)' }),
            //         animate('0.8s ease-in-out', style({ transform: 'translateY(0%)' }))
            //         ], { optional: true}),
            //         query(':leave', [
            //         style({ transform: 'translateY(0%)' }),
            //         animate('0.8s ease-in-out', style({ transform: 'translateY(-100%)' }))],
            //     { optional: true}),
            //     ])
            //     ])
    ]);
