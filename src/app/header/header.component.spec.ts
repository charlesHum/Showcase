import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ScrollToModule.forRoot(), MatToolbarModule, BrowserAnimationsModule,
         MatTabsModule, MatTableModule, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain all headers', () => {
    const compiled = fixture.debugElement;
    expect(compiled.query(By.css('#home')).nativeElement.textContent).toContain('Home');
    expect(compiled.query(By.css('#projects')).nativeElement.textContent).toContain('Projects');
    expect(compiled.query(By.css('#contact')).nativeElement.textContent).toContain('Contact');
    // expect(compiled.query(By.css('#logout')).nativeElement.textContent).toContain('Logout');
  });

});
