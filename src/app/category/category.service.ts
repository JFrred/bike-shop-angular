import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Category } from "../models/category";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    url = environment.baseUrl + "/categories";

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Category> {
        return this.http.get<Category>(this.url);
    }

}