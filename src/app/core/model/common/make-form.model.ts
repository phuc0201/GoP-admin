import { FormControl } from '@angular/forms';

export type MakeForm<T> = {
  [P in keyof T]: FormControl<T[P]>;
};
