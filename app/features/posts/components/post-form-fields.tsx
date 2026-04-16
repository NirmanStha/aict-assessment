import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

export interface PostFormValues {
  title: string;
  body: string;
  tagsInput: string;
}

export interface PostFormErrors {
  title?: string;
  body?: string;
  tagsInput?: string;
}

interface PostFormFieldsProps {
  values: PostFormValues;
  onChange: (nextValues: PostFormValues) => void;
  showPlaceholders?: boolean;
  errors?: PostFormErrors;
}

export function PostFormFields({
  values,
  onChange,
  showPlaceholders = false,
  errors,
}: PostFormFieldsProps) {
  return (
    <div className="space-y-4">
      <Field>
        <FieldLabel>Title</FieldLabel>
        <Input
          aria-invalid={Boolean(errors?.title)}
          className="h-10 rounded-xl border-border/80 bg-input/35"
          value={values.title}
          onChange={(event) =>
            onChange({ ...values, title: event.target.value })
          }
          placeholder={showPlaceholders ? "Write a title" : undefined}
        />
        <FieldError>{errors?.title}</FieldError>
      </Field>

      <Field>
        <FieldLabel>Body</FieldLabel>
        <textarea
          aria-invalid={Boolean(errors?.body)}
          value={values.body}
          onChange={(event) =>
            onChange({ ...values, body: event.target.value })
          }
          className="min-h-40 w-full rounded-xl border border-border/80 bg-input/35 px-3 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/30"
          placeholder={showPlaceholders ? "Write the post content" : undefined}
        />
        <FieldError>{errors?.body}</FieldError>
      </Field>

      <Field>
        <FieldLabel>Tags</FieldLabel>
        <Input
          aria-invalid={Boolean(errors?.tagsInput)}
          className="h-10 rounded-xl border-border/80 bg-input/35"
          value={values.tagsInput}
          onChange={(event) =>
            onChange({ ...values, tagsInput: event.target.value })
          }
          placeholder={showPlaceholders ? "news, tech" : undefined}
        />
        <FieldError>{errors?.tagsInput}</FieldError>
        <FieldDescription>
          Separate tags with commas. Example: news, tech, product
        </FieldDescription>
      </Field>
    </div>
  );
}
