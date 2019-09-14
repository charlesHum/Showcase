import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectService } from '../services/project.service';
import { ProjectsComponent } from '../projects/projects.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, ProjectsComponent ],
      imports: [MatCardModule, HttpClientTestingModule],
      providers: [ProjectService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Full Stack Developer.');
  });

  it('should have data for tiles', () => {
    const home = new HomeComponent();
    const titles = ['Front-end', 'Back-end', 'DB', 'DevOps'];
    expect(home.tiles.length).toBe(4);
    home.tiles.map(x => expect(titles.includes(x.text)).toBeTruthy());
  });

  it('should contain all skill headers', () => {
    const compiled = fixture.debugElement;
    expect(compiled.query(By.css('.skill-text-center')).nativeElement.querySelector('h1').textContent).toContain('Front-end');
  });
});
