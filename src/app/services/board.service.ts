import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Board } from "../interfaces";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ListResponseModel } from '../interfaces/listResponseModel';

@Injectable({
    providedIn: 'root'
})
export class BoardService {
    baseUrl = `${environment.baseUrl}/Board`;
    boards: Board[] = [];
    constructor(private http: HttpClient) { }

    getAllBoards(): Observable<ListResponseModel<Board>> {
        return this.http.get<ListResponseModel<Board>>(`${this.baseUrl}/AllBoards`);
    }
    addNewBoard(board: Partial<Board>) {
        return this.http.post<ListResponseModel<Board>>(`${this.baseUrl}/add`, board);
    }

    deleteBoard(board: Partial<Board>) {
        return this.http.delete<ListResponseModel<Board>>(`${this.baseUrl}/delete`, { body: board });
    }

    updateBoard(board: Partial<Board>) {
        return this.http.put<ListResponseModel<Board>>(`${this.baseUrl}/update`, board)
    }











}