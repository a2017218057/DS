import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded;charset=utf-8',
    
  }),
  withCredentials: true
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
  public logout(){
    const logoutInfo = new HttpParams();
    return this.http.post('http://localhost:8080/leave/auth/logout',logoutInfo,httpOptions);
  }
  public register(username,password){
    const registerInfo = new HttpParams().set("username", username).set("password", password);
    return this.http.post('http://localhost:8080/leave/auth/register', registerInfo, httpOptions);
  }
  public getLoadDoneList(username, pageIndex = 1, pageSize = 10){
    //console.log("开始post"+username);
    const getLoadDoneListInfo = new HttpParams()
      .set("username", username)
      .set("page", pageIndex.toString())
      .set("pageSize", pageSize.toString());
    return this.http.post("http://localhost:8080/leave/load/doneList", getLoadDoneListInfo, httpOptions);
  }
  public getLoadSelfList(username, pageIndex = 1, pageSize = 10){
    console.log("开始post"+username);
    const getLoadDoneListInfo = new HttpParams()
      .set("username", username)
      .set("page", pageIndex.toString())
      .set("pageSize", pageSize.toString());
    return this.http.post("http://localhost:8080/leave/load/selfList", getLoadDoneListInfo, httpOptions);
  }
  public addinfopicture(name, dynasty, place, type, pathdoc, pathpic, ifcheck,tag_seq,ifcheckdown){
    console.log(name);
    const pictureinfo = new HttpParams().
    set("name", name).
    set("dynasty", dynasty).
    set("place", place).
    set("type", type).
    set("pathdoc", pathdoc).
    set("pathpic",pathpic).
    set("ifcheck",ifcheck).
    set("tag_seq",tag_seq).
    set("ifcheckdown",ifcheckdown);
    return this.http.post('http://localhost:8080/leave/add/addinfo', pictureinfo, httpOptions);
  }
  public getLoadDropList(username, pageIndex = 1, pageSize = 10){
    const getLoadDropList = new HttpParams()
    .set("username", username)
    .set("page", pageIndex.toString())
    .set("pageSize", pageSize.toString());
  return this.http.post("http://localhost:8080/leave/apply/draftList", getLoadDropList, httpOptions);
  }
  public deletInfo(uid){
    console.log("delet");
    const deleteInfo = new HttpParams().set("uid", uid);
    return this.http.post('http://localhost:8080/leave/apply/delete', deleteInfo, httpOptions);
  }
  public updateInfo(params){
    let queryString = "";
    for (const key in params){
      queryString += key + "=" + params[key] + "&";
    }
    queryString = queryString.substr(0, queryString.length - 1);
    const updateInfo = new HttpParams({fromString : queryString});
    return this.http.post("http://localhost:8080/leave/apply/modify", updateInfo, httpOptions);

  }
  public searchinfo(event,username,pageIndex,pageSize){
    const searchinfo = new HttpParams().set('event',event).
    set("username", username)
    .set("page", pageIndex.toString())
    .set("pageSize", pageSize.toString());
    return this.http.post('http://localhost:8080/leave/searchinfo/searchlist', searchinfo, httpOptions);
  }
  public searchtags(tag_seq,username,pageIndex,pageSize){
    const searchtags = new HttpParams().set('tag_seq',tag_seq).
    set("username", username)
    .set("page", pageIndex.toString())
    .set("pageSize", pageSize.toString());
    return this.http.post('http://localhost:8080/leave/searchinfo/searchtags', searchtags, httpOptions);
  }
  public DownloadPic(pathpic){
    
    const downloadinfo = new HttpParams().set('pathpic',pathpic);
    return this.http.post('http://localhost:8080/leave/download/pic', downloadinfo, httpOptions)

  }
}
