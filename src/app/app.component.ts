import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, TabsComponent],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({ position: 'relative', overflow: 'hidden' }),

        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              opacity: 0,
            }),
          ],
          { optional: true }
        ),

        group([
          query(
            ':leave',
            [
              animate(
                '150ms ease-in',
                style({
                  opacity: 0,
                  transform: 'translateX(-20px)',
                })
              ),
            ],
            { optional: true }
          ),
          query(
            ':enter',
            [
              style({
                opacity: 0,
                transform: 'translateX(20px)',
              }),
              animate(
                '150ms ease-in',
                style({ opacity: 1, transform: 'translateX(0)' })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),

      transition(':decrement', [
        style({ position: 'relative', overflow: 'hidden' }),

        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              opacity: 0,
            }),
          ],
          { optional: true }
        ),

        group([
          query(
            ':leave',
            [
              animate(
                '150ms ease-in',
                style({
                  opacity: 0,
                  transform: 'translateX(20px)',
                })
              ),
            ],
            { optional: true }
          ),
          query(
            ':enter',
            [
              style({
                opacity: 0,
                transform: 'translateX(-20px)',
              }),
              animate(
                '150ms ease-in',
                style({ opacity: 1, transform: 'translateX(0)' })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent {
  title?: string;
  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated &&
      outlet.activatedRouteData['tabIndex'] !== undefined
      ? outlet.activatedRouteData['tabIndex']
      : 0;
  }
}
