import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from "@redwoodjs/forms";

import type { EditUserById, UpdateUserInput } from "types/graphql";
import type { RWGqlError } from "@redwoodjs/forms";

type FormUser = NonNullable<EditUserById["user"]>;

interface UserFormProps {
  user?: EditUserById["user"];
  onSave: (data: UpdateUserInput, id?: FormUser["id"]) => void;
  error: RWGqlError;
  loading: boolean;
}

const UserForm = (props: UserFormProps) => {
  const onSubmit = (data: FormUser) => {
    props.onSave(data, props?.user?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormUser> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

        <TextField
          name="email"
          defaultValue={props.user?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.user?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="stateId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          State id
        </Label>

        <TextField
          name="stateId"
          defaultValue={props.user?.stateId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={"undefined"}
        />

        <FieldError name="stateId" className="rw-field-error" />

        <Label
          name="districtId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          District id
        </Label>

        <TextField
          name="districtId"
          defaultValue={props.user?.districtId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={"undefined"}
        />

        <FieldError name="districtId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default UserForm;
