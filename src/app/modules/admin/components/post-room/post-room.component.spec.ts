import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostRoomComponent } from './post-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostRoomComponent', () => {
  let component: PostRoomComponent;
  let fixture: ComponentFixture<PostRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostRoomComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PostRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
