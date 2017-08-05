import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ServersService {

  constructor(private http: Http) { }

// put overwrites existing, post appends in FB.
  storeServers(servers: any[]) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    // post method creates an Observable for the request, does not send
    return this.http.put('https://angular-http-4596c.firebaseio.com/data.json',
      servers,
      {headers: headers});
  }

  getServers() {
    // const headers = new Headers({
    //   'Content-Type': 'application/json'
    // });
    // post method creates an Observable for the request, does not send
    // map takes the old obs, and wraps the data in a new obs
    // inside the map callback, do your logic and return the data type, the map
    // function will then wrap this data in an Obs
    return this.http.get('https://angular-http-4596c.firebaseio.com/data.json')
      .map(
        (response: Response) => {
          const servers = response.json()['-Kqmczp2QDZMSAo3zp1Z'];
          for (const server of servers) {
            console.log(server);
            server.name = 'FETCHED_' + server.name
          }
          return servers;
        }
      )
      .catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw('Something went wrong!');
          // then we could log the error and pop a modal up!
        }
      );
  }

  getAppName() {
    return this.http.get('https://angular-http-4596c.firebaseio.com/appName.json')
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

}
