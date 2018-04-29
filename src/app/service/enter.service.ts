import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
    
  })
};
@Injectable()
export class EnterService implements OnInit{

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  public login(username, password){
    const loginInfo = new HttpParams().set("username", username).set("password", password);
    return this.http.post('http://localhost:8080/leave/auth/login', loginInfo, httpOptions);
  }
  public getLoadDoneList(username, pageIndex = 1, pageSize = 10){
    console.log("开始post"+username);
    const getLoadDoneListInfo = new HttpParams()
      .set("username", username)
      .set("page", pageIndex.toString())
      .set("pageSize", pageSize.toString());
    return this.http.post("http://localhost:8080/leave/load/doneList", getLoadDoneListInfo, httpOptions);
  }
}
