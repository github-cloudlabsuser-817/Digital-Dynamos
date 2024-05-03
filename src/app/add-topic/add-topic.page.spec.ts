import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTopicPage } from './add-topic.page';

describe('AddTopicPage', () => {
  let component: AddTopicPage;
  let fixture: ComponentFixture<AddTopicPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddTopicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
