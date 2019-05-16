
import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ActivatedRoute, Params } from "@angular/router";

import { Observable } from "rxjs";

import * as CryptoJS from "crypto-js";
import * as moment_ from 'moment';



import { Config } from './config.model';


@Injectable({
  providedIn: "root"
})

export class AuthSiV1Service {

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  login(config: Config) {
    const moment = moment_;

    const urlRedirect = `${config.urlAuth}?RedirectURL=${config.urlProject}`;
    const date = moment(new Date()).unix();
    const expire = date + config.validate;
    const validator = this.callBackValidatorDecrypt(config.keys);
    const redirect = this.callBackRedirectDecrypt(config.keys);
    const expired = this.expired(date, validator);

    return new Promise((resolve, reject) => {
      if (validator && expired) {
        return resolve('Token Valido');
      } else {
        this.activatedRoute.queryParams.subscribe((params: Params) => {         
          const id = params["id"];
          if (id && redirect) {
            return this.callBackUserApi(config.urlApi, id).subscribe(data => {
              const user = JSON.stringify(data);
              const userEncrypt = this.callBackEncrypt(config.keys, user);
              // const userDecrypt = this.userDecrypt(keys, userEncrypt);
              localStorage.setItem(
                "expire",
                this.callBackEncrypt(config.keys, String(expire))
              );
              localStorage.setItem("user", userEncrypt)
              resolve('Autenticado');
            });
          } else {
            this.onNavigate(urlRedirect, config.keys);
          }
        }, (err) => {
          reject(err);
        });
      }
    });

  }

  public userDecrypt(keys: string, value: string) {
    const user = JSON.parse(this.callBackDecrypt(keys, value));
    return user;
  }

  private expired(date: number, validator: string) {
    const valida = Number(validator);
    if (valida - date > 0) {
      return true;
    }  

    if (valida - date < 0 && valida != 0) {
      localStorage.clear();
      return false;
    }

      return false;
       
  }

  private callBackValidatorDecrypt(keys: string) {
    const expire = localStorage.getItem("expire");

    if (expire) {
      return this.callBackDecrypt(keys, localStorage.getItem("expire"));
    }
    return "0";
  }

  private callBackRedirectDecrypt(keys: string) {
    
    const redirect = localStorage.getItem("redirect");

    if (redirect) {
      return this.callBackDecrypt(keys, localStorage.getItem("redirect"));
    }
    return false;
  }

  private callBackUserApi(urlApi: string, token: string): Observable<any> {
    return this.http.get<any>(urlApi, {
      params: new HttpParams().set("id", token)
    });
  }

  private callBackEncrypt(keys: string, value: string) {
    return CryptoJS.AES.encrypt(value, keys).toString();
  }

  private callBackDecrypt(keys: string, value: string) {
    return CryptoJS.AES.decrypt(value, keys).toString(CryptoJS.enc.Utf8);
  }

  private onNavigate(url: string, keys: string) {
    localStorage.setItem("redirect", this.callBackEncrypt(keys, "true"));
    window.location.href = `${url +
      this.location.prepareExternalUrl(this.location.path()).split("#")[1]}`;
  }
}
