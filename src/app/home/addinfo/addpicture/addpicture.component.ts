import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { EnterService } from '../../../service/enter.service';
@Component({
  selector: 'app-addpicture',
  templateUrl: './addpicture.component.html',
  styleUrls: ['./addpicture.component.css']
})
export class AddpictureComponent implements OnInit {


  validateForm: FormGroup;
  
    _submitForm() {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[ i ].markAsDirty();
       
      }
      console.log(this.validateForm.value);
      this.enterService.addinfopicture(this.validateForm.controls['name'].value,
                                       this.validateForm.controls['dynasty'].value,
                                      this.validateForm.controls['place'].value,
                                      this.validateForm.controls['type'].value).subscribe(
                                      data =>{
                                          if(data['errno'] === 0)
                                          {
                                            console.log("bingo！!!");

                                          }
                                      },
                                      err =>{

                                      }
                                      );
    }
  
    constructor(private fb: FormBuilder,
                private enterService: EnterService) {
                  
    }
  
    
    ngOnInit() {
      this.validateForm = this.fb.group({
        name: [null, [Validators.required]],
        dynasty: [null, Validators.required],
        place: [null],
        type: [null]
      });
    }
  
    getFormControl(name) {
      return this.validateForm.controls[ name ];
    }
}
