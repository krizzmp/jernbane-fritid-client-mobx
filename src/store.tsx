import { action, computed, observable } from "mobx";

interface Validatable {
  validate(): boolean;
}

function validateAll(xs: Validatable[]): boolean {
  return xs.map(x => x.validate()).some(x => x);
}

type BaseInputArgs<T> = {
  label: string;
  description: string;

  changeValidator?: (v: T) => string | null | undefined;
  submitValidator?: (v: T) => string | null | undefined;
};
export class BaseInput<T> implements Validatable {
  id = Math.random().toString();
  changeValidator: (v: T) => string | null | undefined;
  submitValidator: (v: T) => string | null | undefined;
  @observable _value: T;
  @observable error: string | null | undefined = null;
  @observable label: string;
  @observable description: string;

  constructor({
    label,
    description,
    defaultValue,
    changeValidator = () => null,
    submitValidator = () => null
  }: BaseInputArgs<T> & { defaultValue: T }) {
    this._value = defaultValue;
    this.label = label;
    this.description = description;
    this.changeValidator = changeValidator;
    this.submitValidator = submitValidator;
  }

  @computed get value() {
    return this._value;
  }

  set value(v) {
    this.error = this.changeValidator(v);
    this._value = v;
  }

  @action.bound validate(): boolean {
    this.error =
      this.changeValidator(this.value) || this.submitValidator(this.value);
    return !!this.error;
  }
}

export class CheckboxInput extends BaseInput<boolean> {
  constructor({
    defaultValue = false,
    ...t
  }: BaseInputArgs<boolean> & { defaultValue?: boolean }) {
    super({ defaultValue, ...t });
  }
}
export class MultiInput extends BaseInput<string[]> {
  @observable items: string[];
  constructor({
    defaultValue = [],
    items,
    ...t
  }: BaseInputArgs<string[]> & { defaultValue?: string[]; items: string[] }) {
    super({ defaultValue, ...t });
    this.items = items;
  }
}
export class TextInput extends BaseInput<string> {
  constructor({
    defaultValue = "",
    ...t
  }: BaseInputArgs<string> & { defaultValue?: string }) {
    super({ defaultValue, ...t });
  }
}

let cprChangeValidator = (v: string) =>
  /^[0-9]*$/.test(v) ? undefined : "not a number";

let nameChangeValidator = (v: string) =>
  /^[^0-9]*$/.test(v) ? null : "names cannot contain numbers";

let requiredValidator = (v: string) =>
  v === "" ? "this field is required" : null;
let notEmptyValidator = (v: string[]) =>
  v.length === 0 ? "this field is required" : null;

export class Member implements Validatable {
  id = Math.random().toString();
  @observable cpr = new TextInput({
    label: "cpr",
    description: "this is cpr",
    changeValidator: cprChangeValidator,
    submitValidator: requiredValidator
  });
  @observable name = new TextInput({
    label: "name",
    description: "name",
    changeValidator: nameChangeValidator,
    submitValidator: requiredValidator
  });
  @observable memberships = new MultiInput({
    label: "memberships",
    description: "this is memberships",
    items: ["a", "b", "c"],
    submitValidator: notEmptyValidator
  });
  @observable payment = new MultiInput({
    label: "payment",
    description: "this is a payment",
    items: ["a", "b", "c"],
    submitValidator: notEmptyValidator
  });

  @action validate(): boolean {
    return validateAll([this.cpr, this.name, this.memberships, this.payment]);
  }
  toJson() {
    return {
      cpr: this.cpr.value,
      name: this.name.value,
      memberships: this.memberships.value,
      payment: this.payment.value
    };
  }
}

export class MemberPrimary extends Member {
  @observable address = new TextInput({
    label: "address",
    description: "this is an address",
    submitValidator: requiredValidator
  });
  @observable email = new TextInput({
    label: "email",
    description: "this is an email",
    submitValidator: requiredValidator
  });
  @observable phone = new TextInput({
    label: "phone",
    description: "this is an phone",
    submitValidator: requiredValidator
  });
  @observable magazine = new CheckboxInput({
    label: "magazine",
    description: "this is a magazine"
  });

  @action validate(): boolean {
    const t = super.validate();
    const s = validateAll([
      this.address,
      this.email,
      this.phone,
      this.magazine
    ]);
    return t || s;
  }
  toJson() {
    return {
      ...super.toJson(),
      address: this.address.value,
      email: this.email.value,
      phone: this.phone.value,
      magazine: this.magazine.value
    };
  }
}

export class Todo {
  @observable member = new MemberPrimary();
  @observable spouses: Member[] = [];
  @action.bound validate() {
    return validateAll([this.member, ...this.spouses]);
  }

  @action.bound addSpouse() {
    this.spouses.push(new Member());
  }

  @action.bound removeSpouse(i: number) {
    this.spouses.splice(i, 1);
  }
  toJson() {
    return {
      member: this.member.toJson(),
      spouses: this.spouses.map(s => s.toJson())
    };
  }
}
