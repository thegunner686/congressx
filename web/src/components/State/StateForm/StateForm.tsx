import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from "@redwoodjs/forms";

import type { EditStateById, UpdateStateInput } from "types/graphql";
import type { RWGqlError } from "@redwoodjs/forms";

type FormState = NonNullable<EditStateById["state"]>;

interface StateFormProps {
  state?: EditStateById["state"];
  onSave: (data: UpdateStateInput, id?: FormState["id"]) => void;
  error: RWGqlError;
  loading: boolean;
}

const StateForm = (props: StateFormProps) => {
  const onSubmit = (data: FormState) => {
    props.onSave(data, props?.state?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormState> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.state?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="abbreviation"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Abbreviation
        </Label>

        <TextField
          name="abbreviation"
          defaultValue={props.state?.abbreviation}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="abbreviation" className="rw-field-error" />

        <Label
          name="imageUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image url
        </Label>

        <TextField
          name="imageUrl"
          defaultValue={props.state?.imageUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="imageUrl" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default StateForm;
