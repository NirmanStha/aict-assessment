import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

export interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  role: string;
}

interface UserFormFieldsProps {
  values: UserFormValues;
  onChange: (nextValues: UserFormValues) => void;
  showPlaceholders?: boolean;
}

export function UserFormFields({
  values,
  onChange,
  showPlaceholders = false,
}: UserFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field>
          <FieldLabel>First name</FieldLabel>
          <Input
            className="h-10 rounded-xl border-border/80 bg-input/35"
            value={values.firstName}
            onChange={(event) =>
              onChange({ ...values, firstName: event.target.value })
            }
            placeholder={showPlaceholders ? "John" : undefined}
          />
        </Field>
        <Field>
          <FieldLabel>Last name</FieldLabel>
          <Input
            className="h-10 rounded-xl border-border/80 bg-input/35"
            value={values.lastName}
            onChange={(event) =>
              onChange({ ...values, lastName: event.target.value })
            }
            placeholder={showPlaceholders ? "Doe" : undefined}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            className="h-10 rounded-xl border-border/80 bg-input/35"
            value={values.email}
            onChange={(event) =>
              onChange({ ...values, email: event.target.value })
            }
            placeholder={showPlaceholders ? "john@example.com" : undefined}
          />
        </Field>
        <Field>
          <FieldLabel>Phone</FieldLabel>
          <Input
            className="h-10 rounded-xl border-border/80 bg-input/35"
            value={values.phone}
            onChange={(event) =>
              onChange({ ...values, phone: event.target.value })
            }
            placeholder={showPlaceholders ? "+1 999 555 1212" : undefined}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field>
          <FieldLabel>Age</FieldLabel>
          <Input
            className="h-10 rounded-xl border-border/80 bg-input/35"
            value={values.age}
            onChange={(event) =>
              onChange({ ...values, age: event.target.value })
            }
            placeholder={showPlaceholders ? "30" : undefined}
          />
        </Field>
        <Field>
          <FieldLabel>Role</FieldLabel>
          <Input
            className="h-10 rounded-xl border-border/80 bg-input/35"
            value={values.role}
            onChange={(event) =>
              onChange({ ...values, role: event.target.value })
            }
            placeholder={showPlaceholders ? "admin" : undefined}
          />
        </Field>
      </div>

      <FieldDescription>
        Tip: email and phone should be unique for each user profile.
      </FieldDescription>
    </div>
  );
}
