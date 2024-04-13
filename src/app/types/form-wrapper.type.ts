import { FormControl } from '@angular/forms';

export type FormWrapperType<T> = {
    [Property in keyof T]: FormControl<T[Property]>;
};
