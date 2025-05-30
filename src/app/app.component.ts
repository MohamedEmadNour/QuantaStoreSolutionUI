import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'sql-checker-ui';
    query: any = '';
    result: any = '';
    is_Safe: any = '';
    qureyresult: any = "";
    objectKeys = Object.keys;

    constructor(private http: HttpClient) {}

    executeQuery() {
      this.http.post('https://localhost:44372/api/Database/execute-query', { query: this.query }).subscribe(
            (res: any) => {
              const isMalicious = res.is_malicious ?? false;
              if (isMalicious === true) {
                this.result = 'Yes';
                this.is_Safe = 'No';
              } else {
                this.result = 'No';
                this.is_Safe = 'Yes';
                this.qureyresult = res.rows ?? [];
              }
            },
            (err) => {
              this.result = 'Error';
              this.is_Safe = 'No';
              this.qureyresult = [ { Error: err.error.message || 'Execution failed.' } ];
            }
          );
    }
}
