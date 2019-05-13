import { TestBed, inject, async } from '@angular/core/testing';

import { BouteilleService } from './bouteille.service';

describe('BouteilleService', () => {
    beforeEach(async(() => {
	TestBed.configureTestingModule({
	    providers: [
		BouteilleService
	    ]
	});
    }));

    it('should be created', () => {
	const service: BouteilleService = TestBed.get(BouteilleService);
	expect(service).toBeTruthy();
    });
});
