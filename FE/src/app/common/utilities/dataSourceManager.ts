import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { dataSource } from "../models/dataSource";
import { dataFilter } from "../models/dataFilter";

export class dataSourceManager<T = any> {
    constructor(private http: HttpClient, private api: string) { }

    dataSubject: BehaviorSubject<dataSource<T>> = new BehaviorSubject<dataSource<T>>({ data: [], rowCount: 0 });

    refresh(input: dataFilter = { ascending: true, limit: 10, offset: 0, sortBy: '' }) {
        this.http.post<dataSource<T>>(this.api, input).subscribe(res => {
            this.dataSubject.next(res);
        });
    }
}
