import { Input } from "@/components/ui/input";

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
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">First name</p>
          <Input
            value={values.firstName}
            onChange={(event) =>
              onChange({ ...values, firstName: event.target.value })
            }
            placeholder={showPlaceholders ? "John" : undefined}
          />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">Last name</p>
          <Input
            value={values.lastName}
            onChange={(event) =>
              onChange({ ...values, lastName: event.target.value })
            }
            placeholder={showPlaceholders ? "Doe" : undefined}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">Email</p>
          <Input
            value={values.email}
            onChange={(event) =>
              onChange({ ...values, email: event.target.value })
            }
            placeholder={showPlaceholders ? "john@example.com" : undefined}
          />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">Phone</p>
          <Input
            value={values.phone}
            onChange={(event) =>
              onChange({ ...values, phone: event.target.value })
            }
            placeholder={showPlaceholders ? "+1 999 555 1212" : undefined}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">Age</p>
          <Input
            value={values.age}
            onChange={(event) =>
              onChange({ ...values, age: event.target.value })
            }
            placeholder={showPlaceholders ? "30" : undefined}
          />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">Role</p>
          <Input
            value={values.role}
            onChange={(event) =>
              onChange({ ...values, role: event.target.value })
            }
            placeholder={showPlaceholders ? "admin" : undefined}
          />
        </div>
      </div>
    </>
  );
}
