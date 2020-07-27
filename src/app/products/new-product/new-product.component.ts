import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  selectedFile: File = null;
  step1;
  step2;
  step3;
  actualStep;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.step1 = document.getElementById('step1');
    this.step2 = document.getElementById('step2');
    this.step3 = document.getElementById('step3');
    this.step2.classList.add("hidden");
    this.step3.classList.add("hidden");
    this.actualStep = this.step1;
  }

  nextStep(stepNum: number){
    let prevStepButton = document.getElementById('step'+(stepNum-1) + 'Button');
    prevStepButton.classList.remove('btn-primary');
    prevStepButton.classList.add('btn-default');

    let nextStepButton = document.getElementById('step'+stepNum + 'Button');
    nextStepButton.classList.remove('btn-default');
    nextStepButton.classList.add('btn-primary');

    let nextStep = document.getElementById('step'+stepNum);
    this.actualStep.parentNode.removeChild(this.actualStep);
    this.actualStep = nextStep;
    nextStep.classList.remove('hidden');
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    //Subir imagen
    /*const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
      .subscribe(res => {
        console.log(res);
      });
    this.http.post('', fd);*/
  }
}
