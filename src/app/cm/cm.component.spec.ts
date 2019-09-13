import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { CmComponent } from './cm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('CmComponent', () => {
  let component: CmComponent;
  let fixture: ComponentFixture<CmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmComponent ],
      imports: [MatTableModule, HttpClientTestingModule, RouterTestingModule, MatTabsModule, MatSnackBarModule,
         FormsModule, MatIconModule, ReactiveFormsModule, MaterialFileInputModule, MatFormFieldModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
