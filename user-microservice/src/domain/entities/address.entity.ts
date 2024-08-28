export class AddressEntity {
  private id: string;
  private street: string;
  private city: string;
  private state: string;
  private postalCode: string;
  private country: string;

  constructor(street: string, city: string, state: string, postalCode: string, country: string, id?: string) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
    this.id = id;
  }

  getId() {
    return this.id;
  }

  getStreet() {
    return this.street;
  }

  setStreet(street: string) {
    this.street = street;
  }

  getCity() {
    return this.city;
  }

  setCity(city: string) {
    this.city = city;
  }

  getState() {
    return this.state;
  }

  setState(state: string) {
    this.state = state;
  }

  getPostalCode() {
    return this.postalCode;
  }

  setPostalCode(postalCode: string) {
    this.postalCode = postalCode;
  }

  getCountry() {
    return this.country;
  }

  setCountry(country: string) {
    this.country = country;
  }

  toJSON() {
    return {
      id: this.id,
      street: this.street,
      city: this.city,
      state: this.state,
      postalCode: this.postalCode,
      country: this.country,
    };
  }
}
