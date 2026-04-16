import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

export interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  role: string;
}

export interface UserFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  age?: string;
  role?: string;
}

interface UserFormFieldsProps {
  values: UserFormValues;
  onChange: (nextValues: UserFormValues) => void;
  showPlaceholders?: boolean;
  errors?: UserFormErrors;
}

export function UserFormFields({
  values,
  onChange,
  showPlaceholders = false,
  errors,
}: UserFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field>
          <FieldLabel>First name</FieldLabel>
          <Input
            aria-invalid={Boolean(errors?.firstName)}
            className="h-10 rounded-xl border-border/80 bg-input/35"
            value={values.firstName}
            onChange={(event) =>
              onChange({ ...values, firstName: event.target.value })
            }
            placeholder={showPlaceholders ? "John" : undefined}
          />
          <FieldError>{errors?.firstName}</FieldError>
        </Field>
        <Field>
          <FieldLabel>Last name</FieldLabel>
          <Input
            aria-invalid={Boolean(errors?.lastName)}
            className="h-10 rounded-xl border-border/80 bg-input/35"
            value={values.lastName}
            onChange={(event) =>
              onChange({ ...values, lastName: event.target.value })
            }
            placeholder={showPlaceholders ? "Doe" : undefined}
          />
          <FieldError>{errors?.lastName}</FieldError>
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            aria-invalid={Boolean(errors?.email)}
            className="h-10 rounded-xl border-border/80 bg-input/35"
            value={values.email}
            onChange={(event) =>
              onChange({ ...values, email: event.target.value })
            }
            placeholder={showPlaceholders ? "john@example.com" : undefined}
          />
          <FieldError>{errors?.email}</FieldError>
        </Field>
        <Field>
          <FieldLabel>Phone</FieldLabel>
          <Input
            aria-invalid={Boolean(errors?.phone)}
            className="h-10 rounded-xl border-border/80 bg-input/35"
            value={values.phone}
            onChange={(event) =>
              onChange({ ...values, phone: event.target.value })
            }
            placeholder={showPlaceholders ? "+1 999 555 1212" : undefined}
          />
          <FieldError>{errors?.phone}</FieldError>
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field>
          <FieldLabel>Age</FieldLabel>
          <Input
            aria-invalid={Boolean(errors?.age)}
            className="h-10 rounded-xl border-border/80 bg-input/35"
            value={values.age}
            onChange={(event) =>
              onChange({ ...values, age: event.target.value })
            }
            placeholder={showPlaceholders ? "30" : undefined}
          />
          <FieldError>{errors?.age}</FieldError>
        </Field>
        <Field>
          <FieldLabel>Role</FieldLabel>
          <Input
            aria-invalid={Boolean(errors?.role)}
            className="h-10 rounded-xl border-border/80 bg-input/35"
            value={values.role}
            onChange={(event) =>
              onChange({ ...values, role: event.target.value })
            }
            placeholder={showPlaceholders ? "admin" : undefined}
          />
          <FieldError>{errors?.role}</FieldError>
        </Field>
      </div>

      <FieldDescription>
        Tip: email and phone should be unique for each user profile.
      </FieldDescription>
    </div>
  );
}
