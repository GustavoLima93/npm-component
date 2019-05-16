import { Component, OnInit } from "@angular/core";

import { NgxSpinnerService } from 'ngx-spinner';

import { AuthSiV1Service } from 'auth-si-v1';

@Component({
  selector: "app-teste",
  templateUrl: "./teste.component.html",
  styleUrls: ["./teste.component.scss"]
})
export class TesteComponent implements OnInit {

  private config = {
    urlAuth:  "http://websgppvwbr01.bs.br.bsch:9091/",
    urlProject: "http://localhost:4200/@",
    urlApi: "https://sgd.paas.santanderbr.pre.corp/api-src/user/decrypt",
    keys: "gustavo",
    validate: 60
  }

  constructor(
    private auth: AuthSiV1Service,
    public spinner: NgxSpinnerService
    ) {
    
    }

  ngOnInit() {

   this.spinner.show();

    this.auth.login(this.config).then((data)=>{
      console.log('resolveu', data)
     this.spinner.hide();
    }).catch((err) => {
      console.log(err)      
    })
    
  }
}
