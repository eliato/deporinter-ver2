import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import  '../../../../assets/js/smtp.js';
import { HttpClient } from '@angular/common/http';
declare let Email: any;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

@ViewChild('nombre') nameInput: ElementRef;
@ViewChild('apellido') apellidoInput: ElementRef;
@ViewChild('email') emailInput: ElementRef;
@ViewChild('mensaje') messageInput: ElementRef;
@ViewChild('telefono') telefonoInput: ElementRef;
alert = false;
menssaje = false;
mensaje_alerta:string;

endpoint = "https://deporinter.net/send_email/index.php";


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  send() { 
    if (this.nameInput.nativeElement.value == '') {
        this.alert = true;
        this.mensaje_alerta = 'por favor ingresa un nombre'
      }else if(this.emailInput.nativeElement.value == ''){
        this.alert = true;
        this.mensaje_alerta = 'por favor ingresa un correo'
      }else if(this.messageInput.nativeElement.value == ''){
        this.alert = true;
        this.mensaje_alerta = 'por favor ingresa un mensaje'
      }else{
              this.alert = false;
              this.mensaje_alerta = ''
              let postVars = {
                email   : this.emailInput.nativeElement.value,
                name    : this.nameInput.nativeElement.value,
                apellido    : this.apellidoInput.nativeElement.value,
                message : this.messageInput.nativeElement.value,
                subject : this.telefonoInput.nativeElement
              };
  
              //You may also want to check the response. But again, let's keep it simple.
              this.http.post(this.endpoint, postVars)
                  .subscribe(
                      (response: any)=> {
                        console.log(response.mensaje)
                        if (response.mensaje) {
                          this.menssaje = true;
                          
                          this.emailInput.nativeElement.value = '';
                          this.nameInput.nativeElement.value= '';
                          this.telefonoInput.nativeElement.value= '';
                          this.messageInput.nativeElement.value= '';
                          this.apellidoInput.nativeElement.value= '';
                        }
                      }           
  
              )
            }

  }
 
}
