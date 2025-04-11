import { Component, OnInit } from '@angular/core';
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
import { NotificationComponent } from './notification/notification.component';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, TabsComponent, NotificationComponent, NgStyle, NgIf],
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

      transition('* => secondary', [
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
    trigger('bgFadeAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title?: string;
  bg: string =
    'https://fastly.picsum.photos/1920/1080.jpg?hmac=xDeMorMomjhKEbocGtnP89w5iKpSX0h4gMpFaltwJWs';

  // Feature flag (will be moved to an environment later) for background image switch:
  enableDynamicBg = false;

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tabIndex = outlet.activatedRouteData['tabIndex'];
      return tabIndex !== undefined ? tabIndex : 'secondary';
    }
    return 'secondary';
  }

  ngOnInit() {
    this.changeBgImage();
  }

  changeBgImage(): void {
    this.bg = this.enableDynamicBg
      ? this.generateRandomBgUrl()
      : this.fallbackBgUrl;
  }

  // Helpers:

  private fallbackBgUrl =
    'https://fastly.picsum.photos/id/450/1920/1080.jpg?hmac=xDeMorMomjhKEbocGtnP89w5iKpSX0h4gMpFaltwJWs';

  private generateRandomBgUrl(): string {
    return `https://picsum.photos/1920/1080?random=${Date.now()}`;
  }
}
