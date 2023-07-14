import { Router } from '@angular/router';
import { Injectable} from "@angular/core";
import { Observable } from 'rxjs';

declare let alertify:any;

@Injectable({
    providedIn:"root"
})

export class AlertifyService{
    constructor(
      router:Router
    ){}

    success(message: string){
        alertify.success(message);
    }

    error(message: string){
        alertify.error(message);
    }

    warning(message: string){
        alertify.warning(message);
    }

    alert(message:string, title:string){
      alertify.alert(title,message, function(){  });
    }

    confirm(title:string, message:string): Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {
        alertify.confirm(title, message, () => resolve(true), () => resolve(false));
      });
    }
}
