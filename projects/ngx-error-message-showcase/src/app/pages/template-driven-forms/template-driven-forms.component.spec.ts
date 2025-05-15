import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateDrivenFormsComponent } from './template-driven-forms.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { JsonPipe } from '@angular/common';

describe('TemplateDrivenFormsComponent', () => {
  let component: TemplateDrivenFormsComponent;
  let fixture: ComponentFixture<TemplateDrivenFormsComponent>;
  let formEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TemplateDrivenFormsComponent,
        FormsModule,
        JsonPipe,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateDrivenFormsComponent);
    component = fixture.componentInstance;
    formEl = fixture.debugElement.query(By.css('form'));
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar el formulario con inputs iniciales vacíos', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.length).toBeGreaterThan(0);
    inputs.forEach(input => {
      expect((input.nativeElement as HTMLInputElement).value).toBe('');
    });
  });

  it('debería tener el formulario inválido al inicio', () => {
    expect(formEl.nativeElement.checkValidity()).toBeFalse();
  });

  it('debería deshabilitar el botón de submit cuando el formulario es inválido', () => {
    component.model = {
      name: {
        firstName: '',
        lastName: ''
      },
      username: '',
      password: '',
      email: '',
      salary: '',
      aliases: ['']
    };

    fixture.detectChanges();

    const submitBtn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitBtn.disabled).toBeTrue();
  });

  it('debería permitir agregar un alias', () => {
    const initialLength = component.model.aliases.length;
    component.addAlias();
    fixture.detectChanges();
    expect(component.model.aliases.length).toBe(initialLength + 1);
  });

  it('debería llamar onSubmit solo si el formulario es válido', () => {
    spyOn(component, 'onSubmit');

    // Rellenamos datos válidos
    component.model = {
      name: {
        firstName: 'John',
        lastName: 'Doe'
      },
      username: 'johndoe.123',
      password: 'abc123',
      email: 'john@example.com',
      salary: '5000',
      aliases: ['alias1']
    };

    fixture.detectChanges();

    formEl.triggerEventHandler('ngSubmit', {});
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('no debe llamar onSubmit ni loguear si el formulario es inválido', () => {
    spyOn(console, 'log');
    const formMock = { invalid: true } as any;
    component.onSubmit(formMock);
    expect(console.log).not.toHaveBeenCalled();
  });

  it('debe loguear en consola al hacer submit válido', () => {
    spyOn(console, 'log');
    const formMock = { invalid: false } as any;
    component.onSubmit(formMock);
    expect(console.log).toHaveBeenCalledWith('Form Submitted', component.model);
  });

  it('trackByIndex debe retornar el índice recibido', () => {
    expect(component.trackByIndex(5)).toBe(5);
    expect(component.trackByIndex(0)).toBe(0);
  });
});
