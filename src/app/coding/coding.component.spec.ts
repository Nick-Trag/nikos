import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingComponent } from './coding.component';

describe('CodingComponent', () => {
  let component: CodingComponent;
  let fixture: ComponentFixture<CodingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly resolve file paths', () => {
    let result = component.getAbsolutePath('');
    expect(result).toBe('/home/nikos');

    // Absolute paths
    result = component.getAbsolutePath('/');
    expect(result).toBe('/');

    result = component.getAbsolutePath('/home/super/index.txt');
    expect(result).toBe('/home/super/index.txt');

    result = component.getAbsolutePath('/../super/./index.txt');
    expect(result).toBe('/super/index.txt');

    result = component.getAbsolutePath('/.././..');
    expect(result).toBe('/');

    result = component.getAbsolutePath('////');
    expect(result).toBe('/');

    result = component.getAbsolutePath('/.////..//.//');
    expect(result).toBe('/');

    result = component.getAbsolutePath('/home///./../.');
    expect(result).toBe('/');

    result = component.getAbsolutePath('/home///./.././');
    expect(result).toBe('/');

    result = component.getAbsolutePath('/../.././..////./home/nikos/../././//./nikos/.//./test2.txt/');
    expect(result).toBe('/home/nikos/test2.txt');

    // Paths including ~
    result = component.getAbsolutePath('~');
    expect(result).toBe('/home/nikos');

    result = component.getAbsolutePath('~/inner');
    expect(result).toBe('/home/nikos/inner');

    result = component.getAbsolutePath('~/../.');
    expect(result).toBe('/home');

    result = component.getAbsolutePath('~/');
    expect(result).toBe('/home/nikos');

    result = component.getAbsolutePath('~/../nikos');
    expect(result).toBe('/home/nikos');

    // Relative paths
    result = component.getAbsolutePath('./index.html');
    expect(result).toBe('/home/nikos/index.html');

    result = component.getAbsolutePath('.');
    expect(result).toBe('/home/nikos');

    result = component.getAbsolutePath('..');
    expect(result).toBe('/home');

    result = component.getAbsolutePath('../././index.html');
    expect(result).toBe('/home/index.html');

    result = component.getAbsolutePath('../../../index.html');
    expect(result).toBe('/index.html');

    result = component.getAbsolutePath('src/app/index.html');
    expect(result).toBe('/home/nikos/src/app/index.html');

    result = component.getAbsolutePath('src/..////.////.//index.html');
    expect(result).toBe('/home/nikos/index.html');

    result = component.getAbsolutePath('src/~/nikos.html');
    expect(result).toBe('/home/nikos/src/~/nikos.html');
  })
});
