import { ActivatedRoute, Params } from '@angular/router';
import { AuthSiV1Service } from './../../projects/auth-si-v1/src/lib/auth-si-v1.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'authenticator';
  count = 0;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    // this.activatedRoute.queryParams.subscribe((params: Params) => {
    //   const id = params['id'];
    //   if (id) {
    //     console.log(id);
    //   } else {
    //     return;
    //   }});

  }

  // teste() {
  //   this.auth.login('http://websgppvwbr01.bs.br.bsch:9091/', 'http://localhost:4200/@');
  // }

}
