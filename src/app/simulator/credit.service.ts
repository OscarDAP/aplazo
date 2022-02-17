import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class CreditService {

	constructor(private httpClient: HttpClient) {}

	public calculateCredit(request: CreditRequest): Observable<any> {
		return this.httpClient.post(
			environment.apiURL + '/api/credit/calculate',
			request
		)
	}
}

export interface CreditRequest {
	amount: number;
	rate: number;
	terms: number;
}

export interface creditDTO {
	payment_number: number;
	payment_amount: number;
	pending_amount: number;
	payment_date: string;
}

export interface creditResponse {
	status: string;
	message?:string,
	details:creditDTO[] |  string[]
}
