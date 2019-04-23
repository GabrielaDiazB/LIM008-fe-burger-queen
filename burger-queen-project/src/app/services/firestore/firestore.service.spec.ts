import { TestBed } from '@angular/core/testing';
import { FirestoreService } from './firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';

describe('FirestoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FirestoreService,
        { provide: AngularFirestore}
      ]
    });
  });

  it('should be created', () => {
    let service: FirestoreService = TestBed.get(FirestoreService);
    expect(service).toBeTruthy();
  });
});
