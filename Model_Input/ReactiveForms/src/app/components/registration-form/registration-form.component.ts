import { afterNextRender, AfterViewInit, Component, computed, contentChild, ElementRef, Inject, viewChild, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsernameInputComponent } from './inputs/username-input/username-input.component';
import { PasswordInputComponent } from "./inputs/password-input/password-input.component";
import { EmailInputComponent } from "./inputs/email-input/email-input.component";
import { LoggerService } from '../../services/logger.service';
import { BetterloggerService } from '../../services/betterlogger.service';
import { ILogger } from '../../services/ILogger';
import { ProtectedloggerService } from '../../services/protectedlogger.service';
import { protectedLoggerServiceFactory } from '../../services/protectedlogger.service.provider';
import { UserserviceService } from '../../services/userservice.service';
import { APP_FEATURETOGGLE, FEATURE_TOGGLES, FeatureToggle } from '../../services/staticValues/feature-toggle';
import { UsernameInputToken } from './inputs/Models/username-input.token';
@Component({
  selector: 'app-registration-form',
  imports: [ReactiveFormsModule, UsernameInputComponent, PasswordInputComponent, EmailInputComponent],
  providers: [
    {provide: ILogger, 
      useClass: BetterloggerService
    }, 
    {provide: ProtectedloggerService, 
      useFactory: protectedLoggerServiceFactory, 
      deps: [UserserviceService]
    },
    {
      provide: APP_FEATURETOGGLE, 
      useValue: FEATURE_TOGGLES,
    },
    {
      provide: 'featureTogglesOLD',
      useValue: FEATURE_TOGGLES
    },{
      provide: UsernameInputToken,
      useExisting: UsernameInputComponent
    }
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
  host: {
    '[(username)]': 'registrationForm.controls["username"].value'
  }
})
export class RegistrationFormComponent implements AfterViewInit{
  registrationForm: FormGroup;

  // custom component if you want to element ref specify it in the options
  @ViewChild('userNameInput',{ read: ElementRef, static: false }) userNameInputEle: ElementRef | undefined;
  // custom component user the type of the component, don't need to put options
  @ViewChild(UsernameInputComponent) userNameInputComp: UsernameInputComponent | undefined;
  userNameInputViewChild = viewChild.required(UsernameInputToken);
  userNameInputContentChild = contentChild.required(UsernameInputToken);
  // html element will fetch the element ref don't need to put options
  @ViewChild('userNameLabel', { static: false }) userNameLabel!: ElementRef;
  private elementWidthOffset = 10;
  private prevElementWidthOffset = 0;

  constructor(
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private logger: ILogger,
    private protectedLogger: ProtectedloggerService,
    @Inject(APP_FEATURETOGGLE) private featureToggles: FeatureToggle,
    @Inject('featureTogglesOLD') private featureTogglesOLD: FeatureToggle
  ){
      this.registrationForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
      afterNextRender({
        write: () =>{
          const changed = this.elementWidthOffset != this.prevElementWidthOffset;
          if(changed && this.userNameLabel){
            const label = this.userNameInputEle?.nativeElement as HTMLElement;
            label.style.display = 'block';
            
            for (let i = 0; i < 10000; i++){
              label.style.width = `${this.elementWidthOffset * 1}px`;
            }
            console.log('writing')
          }
          return changed;
        },
        read: (didWrite: boolean) =>{
          if (didWrite && this.userNameLabel) {
            const label = this.userNameInputEle?.nativeElement as HTMLElement;
            this.elementWidthOffset = label.offsetWidth;
          }
        }
      })
    
  }

  ngAfterViewInit(): void {
    console.log('after view init');
    console.log(this.userNameInputComp);
    console.log(this.userNameInputEle);
    console.log(this.userNameLabel);
  }

  onSubmit(){
    const viewChildQuery = computed(() => this.userNameInputViewChild()?.username())
    console.log('view child header text is', viewChildQuery());
    
    this.logger.log();
    this.protectedLogger.log();
    console.log('feature toggle new way', this.featureToggles);
    console.log('feature toggle old way', this.featureTogglesOLD)
    // runtime error no component child in the parent
    const componentChildQuery = computed(()=> this.userNameInputContentChild())
    console.log('content child query', componentChildQuery())
    console.log('current values', this.registrationForm);

  }

  // writing style then reading width causes layout recalc
  // read = recalc, write = recalc and loops, reading multiple time then updating style so will keep layout recalc until end of loop
  layoutThrash(){
    const label = this.userNameInputEle?.nativeElement as HTMLElement;
    label.style.display = 'block';
    for (let i = 0; i < 10000; i++){
      label.style.width = `${label.offsetWidth * 1}px`;
    }
  }

  // reading then updating style avoids excessive layout recalc
  // one layout for reading then other for writing, only read once so no need to layout again
  readWriteLayout(){
    const label = this.userNameInputEle?.nativeElement as HTMLElement;
    label.style.display = 'block';
    const layoutOffsetWdith = label.offsetWidth;
    for (let i = 0; i < 10000; i++){
      label.style.width = `${layoutOffsetWdith * 1}px`;
    }
  }

}
