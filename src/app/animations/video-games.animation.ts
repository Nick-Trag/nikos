import { animate, animation, style } from "@angular/animations";

// Reference for re-usable animations: https://www.youtube.com/watch?v=ObYCutiBOTo&list=PLp-SHngyo0_ikgEN5d9VpwzwXA-eWewSM&index=9
export const videoGamesAnimation = animation([
  style({ opacity: 0, translate: '0 -5px' }),
  animate('0.4s ease-in-out', style({ opacity: 1, translate: '0 0' })),
]);
