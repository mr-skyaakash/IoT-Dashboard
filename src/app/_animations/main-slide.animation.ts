import { trigger, transition, style, animate, query, group, state, stagger, keyframes } from '@angular/animations';

export const MainSlideAnimation =
trigger('slide', [
    transition('void => *', [
        query('void', style({ opacity: 0, position: 'fixed' }), {optional: true}),
        group([
            query('*', [
            style({ transform: 'translateY(100%)', opacity: 0}),
            animate('0.8s 0.2s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 }))
            ], { optional: true}),
        ])
    ]),
    transition('* => void', [
        query('void', style({ opacity: 1, position: 'fixed' }), {optional: true}),
        group([
            query('*', [
            style({ transform: 'translateY(0)', opacity: 1}),
            animate('0.8s 0.2s ease-in-out', style({ transform: 'translateY(-100%)', opacity: 0 }))
            ], { optional: true}),
        ])
    ])
]);

