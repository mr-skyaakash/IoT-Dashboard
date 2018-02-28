import { trigger, transition, style, animate, query, group, state } from '@angular/animations';

export const MainSlideAnimation =
    trigger('slide', [
        state('inactive', style({ transform: 'translateY(-100%)' })),
        state('active', style({ transform: 'translateY(0%)' })),
        transition('inactive => active', animate('0.6s ease-in-out')),
        // transition('active => inactive', animate('0.6s ease-in-out')),
    ]);
