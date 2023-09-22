import { Component, signal, computed, effect, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnDestroy, OnInit {


  public counter = signal(10);
  public user = signal<User>({
    id: 7,
    email: "michael.lawson@reqres.in",
    first_name: "Michael",
    last_name: "Lawson",
    avatar: "https://reqres.in/img/faces/7-image.jpg"
  });
  public fullname = computed(() => `${this.user().first_name} ${this.user().last_name}`);
  public userChangeEffect = effect(() => {
    console.log(`${this.user().first_name} ${this.counter}`);
  });

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.userChangeEffect.destroy();
  }

  onFileUpdated(field: keyof User, value: string) {
    /*
    this.user.set({
      ...this.user(),
      [field]: value
    });
    */
    this.user.mutate(current => {
      switch (field) {
        case 'email': current.email = value; break;
        case 'first_name': current.first_name = value; break;
        case 'last_name': current.last_name = value; break;
        case 'id': current.id = Number(value); break;
      }
    });
  }

  encrease(value: number) {
    this.counter.update(current => current + value);
  }
}
