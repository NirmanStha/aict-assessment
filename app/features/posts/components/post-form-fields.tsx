import { Input } from "@/components/ui/input";

export interface PostFormValues {
  title: string;
  body: string;
  tagsInput: string;
  userId?: string;
}

interface PostFormFieldsProps {
  values: PostFormValues;
  onChange: (nextValues: PostFormValues) => void;
  showPlaceholders?: boolean;
  showUserId?: boolean;
}

export function PostFormFields({
  values,
  onChange,
  showPlaceholders = false,
  showUserId = false,
}: PostFormFieldsProps) {
  return (
    <>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">Title</p>
        <Input
          value={values.title}
          onChange={(event) =>
            onChange({ ...values, title: event.target.value })
          }
          placeholder={showPlaceholders ? "Write a title" : undefined}
        />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">Body</p>
        <textarea
          value={values.body}
          onChange={(event) =>
            onChange({ ...values, body: event.target.value })
          }
          className="min-h-36 w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30"
          placeholder={showPlaceholders ? "Write the post content" : undefined}
        />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">
          Tags (comma separated)
        </p>
        <Input
          value={values.tagsInput}
          onChange={(event) =>
            onChange({ ...values, tagsInput: event.target.value })
          }
          placeholder={showPlaceholders ? "news, tech" : undefined}
        />
      </div>

      {showUserId ? (
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">User ID</p>
          <Input
            value={values.userId ?? ""}
            onChange={(event) =>
              onChange({ ...values, userId: event.target.value })
            }
            placeholder={showPlaceholders ? "1" : undefined}
          />
        </div>
      ) : null}
    </>
  );
}
