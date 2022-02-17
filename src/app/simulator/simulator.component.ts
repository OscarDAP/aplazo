import { Component, OnInit } from '@angular/core';
import {
	creditDTO,
	CreditRequest,
	creditResponse,
	CreditService,
} from './credit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STATUS } from '../core/constans';

@Component({
	selector: 'app-simulator',
	templateUrl: './simulator.component.html',
	styleUrls: ['./simulator.component.scss'],
})
export class SimulatorComponent implements OnInit {
	public requestForm: FormGroup = new FormGroup({
		amount: new FormControl('', [
			Validators.min(1.01),
			Validators.max(999999.0),
			Validators.required,
		]),
		rate: new FormControl('', [
			Validators.min(1.01),
			Validators.max(99.99),
			Validators.required,
		]),
		period: new FormControl('', [
			Validators.min(4),
			Validators.max(52),
			Validators.required,
		]),
	});

	public creditDetails: creditDTO[];

	constructor(private creditService: CreditService) {
		this.creditDetails = new Array();
	}

	ngOnInit(): void {}

	public calculate(): void {
		let mount = this.requestForm.get('amount');
		let rate = this.requestForm.get('rate');
		let period = this.requestForm.get('period');

		let requests: CreditRequest = {
			amount: mount?.value,
			rate: rate?.value,
			terms: period?.value,
		};

		if (mount?.valid && rate?.valid && period?.valid) {
			this.creditService.calculateCredit(requests).subscribe(
				(response: creditResponse) => {
					switch (response.status) {
						case STATUS.SUCCESS:
							this.creditDetails =
								response.details as creditDTO[];
							break;
						case STATUS.ERROR:
							window.alert(
								'ERROR PROCESSING INFORMATION: ' +
									response.message
							);
							break;
						case STATUS.INVALID:
							let values: string[] = response.details as string[];
							let message = values.reduce((a, b) => a + '\n' + b);
							window.alert('Invalid data: ' + message);
							break;
					}
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}
