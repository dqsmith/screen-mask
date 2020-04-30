import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { IConfig } from './interfaces/config.interface';

declare var chrome;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  config: IConfig;

  constructor(private storageService: StorageService) {
    this.config = this.storageService.getConfig();

    document.body.addEventListener('mouseleave', this.onLeave);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.executeScript(tabs[0].id, { file: 'content.min.js' }, () => {
        if (chrome.runtime.lastError) {
          console.warn('Unable to inject Screen Mask script into tab.');
        } else {
          this.updateMask();
        }
      });
    });
  }

  onMaskSizeChange(event: any): void {
    this.config.range = Number(event.target.value);

    if (!this.config.on) {
      this.config.on = true;
    }

    this.storageService.setConfig(this.config);

    this.updateMask();
  }

  onToggleMask(event: any): void {
    this.config.on = event.target.checked;

    this.storageService.setConfig(this.config);

    this.updateMask();
  }

  private updateMask(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { screenMask: this.config });
    });
  }

  private onLeave(): void {
   window.close();
  }
}
