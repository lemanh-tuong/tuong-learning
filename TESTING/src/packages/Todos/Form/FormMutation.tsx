import { useForm } from "react-hook-form";
import { Field } from "../../../ui/Field";
import { Todo } from "../models/Todo";
import { formCreateResolver, formUpdateResolver } from "../@consts/zodResolver";

// Type sẽ tương ứng với kết quả đầu ra
type FormCreateValues = Pick<Todo, "description" | "title">;
// Type sẽ tương ứng với kết quả đầu ra
type FormUpdateValues = Pick<Todo, "id" | "description" | "title">;

interface FormBaseProps {
  uid: string;
  onReset?: () => void;
}

interface FormCreateProps extends FormBaseProps {
  variant: "Create";
  defaultValues?: Partial<FormCreateValues>;
  onSubmit?: (values: FormCreateValues) => void;
}

interface FormUpdateProps extends FormBaseProps {
  variant: "Update";
  defaultValues?: Partial<FormUpdateValues>;
  onSubmit?: (values: FormUpdateValues) => void;
}

export type FormProps = FormCreateProps | FormUpdateProps;

export const FormMutation = ({
  defaultValues,
  onSubmit = () => {},
  onReset,
  uid,
  variant,
}: FormProps) => {
  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<FormCreateValues | FormUpdateValues>({
    defaultValues,
    resolver: variant === "Create" ? formCreateResolver : formUpdateResolver,
  });

  const handleSubmit_ = () => {
    return handleSubmit(onSubmit as any, console.log);
  };

  return (
    <form
      id={uid}
      onSubmit={(e) => {
        e.preventDefault();
        const submit = handleSubmit_();
        submit(e);
      }}
      onReset={() => {
        onReset?.();
        reset({});
      }}
    >
      <Field label="Title" error={errors.title?.message}>
        <input {...register("title")} />
      </Field>
      <Field label="Description" error={errors.description?.message}>
        <input {...register("description")} />
      </Field>
    </form>
  );
};
