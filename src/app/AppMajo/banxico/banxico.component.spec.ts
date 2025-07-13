import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanxicoComponent } from './banxico.component';

describe('BanxicoComponent', () => {
  let component: BanxicoComponent;
  let fixture: ComponentFixture<BanxicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BanxicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanxicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
