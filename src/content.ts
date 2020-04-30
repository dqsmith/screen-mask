declare var chrome: any;

class ScreenMask {
  private topMask: HTMLElement;
  private bottomMask: HTMLElement;
  private topMaskId = 'sm-upper-mask';
  private bottomMaskId = 'sm-lower-mask';
  private updateMaskHandler: any;
  private position: number;
  private config: any;

  constructor() {
    this.config = {
      on: false,
      range: 75,
    };
    this.position = 50;

    chrome.runtime.onMessage.addListener((request: any) => {
      if (request.hasOwnProperty(['screenMask'])) {
        this.config = request.screenMask;

        this.setMask();
        this.updateMask();
      }
    });
  }

  private createMask(): void {
    const hasMask: boolean = !!document.getElementById(this.topMaskId);

    if (!hasMask) {
      this.topMask = document.createElement('div');
      this.bottomMask = document.createElement('div');

      this.topMask.id = this.topMaskId;
      this.topMask.classList.add('sm-screen-mask', 'sm-screen-mask-upper');

      this.bottomMask.id = this.bottomMaskId;
      this.bottomMask.classList.add('sm-screen-mask', 'sm-screen-mask-lower');

      document.body.appendChild(this.topMask);
      document.body.appendChild(this.bottomMask);

      this.setMask();

      this.updateMaskHandler = (event: any) => this.updateMaskPosition(event);

      document.addEventListener('mousemove', this.updateMaskHandler);
      document.addEventListener('touchend', this.updateMaskHandler);
    }
  }

  private updateMask(): void {
    if (this.config.on) {
      this.createMask();
    } else {
      this.removeMask();
    }
  }

  private removeMask(): void {
    document.removeEventListener('mousemove', this.updateMaskHandler);
    document.removeEventListener('touchend', this.updateMaskHandler);

    if (this.topMask && this.bottomMask) {
      this.topMask.remove();
      this.bottomMask.remove();
    }
  }

  private updateMaskPosition(event: any): void {
    const touches: TouchList = event.touches;

    if (this.topMask && this.bottomMask) {
      if (touches && touches.length) {
        this.position = touches[0].clientY;
      } else {
        this.position = event.clientY;
      }

      if (this.position) {
        this.setMask();
      }
    }
  }

  private setMask(): void {
    if (this.topMask && this.bottomMask) {
      this.topMask.style.bottom =
        window.innerHeight - this.position + this.config.range / 2 + 'px';
      this.bottomMask.style.top = this.position + this.config.range + 'px';
    }
  }
}

// tslint:disable-next-line: no-unused-expression
new ScreenMask();
