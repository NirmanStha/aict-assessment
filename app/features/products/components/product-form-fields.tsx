import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

export interface ProductFormValues {
  title: string;
  description: string;
  category: string;
  price: string;
  stock: string;
}

interface ProductFormFieldsProps {
  values: ProductFormValues;
  onChange: (nextValues: ProductFormValues) => void;
  showPlaceholders?: boolean;
}

export function ProductFormFields({
  values,
  onChange,
  showPlaceholders = false,
}: ProductFormFieldsProps) {
  return (
    <div className="space-y-4">
      <Field>
        <FieldLabel>Title</FieldLabel>
        <Input
          className="h-10 rounded-xl border-border/80 bg-input/35"
          value={values.title}
          onChange={(event) =>
            onChange({ ...values, title: event.target.value })
          }
          placeholder={showPlaceholders ? "Product title" : undefined}
        />
      </Field>

      <Field>
        <FieldLabel>Description</FieldLabel>
        <textarea
          value={values.description}
          onChange={(event) =>
            onChange({ ...values, description: event.target.value })
          }
          className="min-h-40 w-full rounded-xl border border-border/80 bg-input/35 px-3 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/30"
          placeholder={showPlaceholders ? "Product description" : undefined}
        />
      </Field>

      <div className="grid gap-3 sm:grid-cols-3">
        <Field>
          <FieldLabel>Category</FieldLabel>
          <Input
            className="h-10 rounded-xl border-border/80 bg-input/35"
            value={values.category}
            onChange={(event) =>
              onChange({ ...values, category: event.target.value })
            }
            placeholder={showPlaceholders ? "beauty" : undefined}
          />
        </Field>

        <Field>
          <FieldLabel>Price</FieldLabel>
          <Input
            className="h-10 rounded-xl border-border/80 bg-input/35"
            value={values.price}
            onChange={(event) =>
              onChange({ ...values, price: event.target.value })
            }
            placeholder={showPlaceholders ? "199" : undefined}
          />
        </Field>

        <Field>
          <FieldLabel>Stock</FieldLabel>
          <Input
            className="h-10 rounded-xl border-border/80 bg-input/35"
            value={values.stock}
            onChange={(event) =>
              onChange({ ...values, stock: event.target.value })
            }
            placeholder={showPlaceholders ? "25" : undefined}
          />
        </Field>
      </div>

      <FieldDescription>
        Tip: keep category concise and use numeric values for price and stock.
      </FieldDescription>
    </div>
  );
}
