import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicInfoPage } from './topic-info.page';

describe('TopicInfoPage', () => {
  let component: TopicInfoPage;
  let fixture: ComponentFixture<TopicInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TopicInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
