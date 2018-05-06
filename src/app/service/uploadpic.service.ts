import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'multipart/form-data'
    
  }),
  withCredentials: true
};
@Injectable()
export class UploadpicService {

  constructor(private http: HttpClient) { }

  public uploadpic(file){
    //const picInfo = new HttpParams().set('file',file);
    //picInfo.append('file',file);
    return this.http.post('http://localhost:8080/leave/add/pic', file, httpOptions);
  }
}
