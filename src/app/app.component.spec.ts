import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

// tslint:disable-next-line: no-string-literal
const chrome = (window['chrome'] = {
  tabs: {
    query: () => {},
  },
});

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    component.config = {
      on: false,
      range: 50,
    };
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a config', () => {
    expect(component.config).toBeDefined();
    expect(component.config).toEqual({
      on: false,
      range: 50,
    });
  });

  it('should handle a size change', () => {
    expect(component.onMaskSizeChange).toBeDefined();
    expect(component.config.range).toBe(50);

    const event = {
      target: {
        value: 100,
      },
    };

    component.onMaskSizeChange(event);

    expect(component.config.range).toBe(100);
  });

  it('should turn screen mask on during resize', () => {
    expect(component.onMaskSizeChange).toBeDefined();
    expect(component.config.on).toBe(false);

    const event = {
      target: {
        value: 100,
      },
    };

    component.onMaskSizeChange(event);

    expect(component.config.on).toBe(true);
  });

  it('should turn screen mask to remain on when previously on during resize', () => {
    expect(component.onMaskSizeChange).toBeDefined();
    component.config.on = true;

    const event = {
      target: {
        value: 100,
      },
    };

    component.onMaskSizeChange(event);
    expect(component.config.on).toBe(true);
  });

  it('should handle a toggling screen mask on and off', () => {
    expect(component.onToggleMask).toBeDefined();
    expect(component.config.on).toBe(false);

    const event = {
      target: {
        checked: true,
      },
    };

    component.onToggleMask(event);
    expect(component.config.on).toBe(true);

    event.target.checked = false;

    component.onToggleMask(event);
    expect(component.config.on).toBe(false);
  });
});
