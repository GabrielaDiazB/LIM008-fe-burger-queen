import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderService } from './order.service';

describe('OrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderService,
        {
          provide: AngularFirestore
        }
      ]
    });
  });

  it('should be created', () => {
    const service: OrderService = TestBed.get(OrderService);
    expect(service).toBeTruthy();
  });
});
