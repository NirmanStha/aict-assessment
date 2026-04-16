import { Input } from "@/components/ui/input";

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
    <>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">Title</p>
        <Input
          value={values.title}
          onChange={(event) =>
            onChange({ ...values, title: event.target.value })
          }
          placeholder={showPlaceholders ? "Product title" : undefined}
        />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">Description</p>
        <textarea
          value={values.description}
          onChange={(event) =>
            onChange({ ...values, description: event.target.value })
          }
          className="min-h-36 w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
          placeholder={showPlaceholders ? "Product description" : undefined}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Category</p>
          <Input
            value={values.category}
            onChange={(event) =>
              onChange({ ...values, category: event.target.value })
            }
            placeholder={showPlaceholders ? "beauty" : undefined}
          />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Price</p>
          <Input
            value={values.price}
            onChange={(event) =>
              onChange({ ...values, price: event.target.value })
            }
            placeholder={showPlaceholders ? "199" : undefined}
          />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Stock</p>
          <Input
            value={values.stock}
            onChange={(event) =>
              onChange({ ...values, stock: event.target.value })
            }
            placeholder={showPlaceholders ? "25" : undefined}
          />
        </div>
      </div>
    </>
  );
}
