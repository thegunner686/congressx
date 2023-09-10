import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  CheckboxField,
  Submit,
} from "@redwoodjs/forms";

import type {
  EditRepresentativeById,
  UpdateRepresentativeInput,
} from "types/graphql";
import type { RWGqlError } from "@redwoodjs/forms";

type FormRepresentative = NonNullable<EditRepresentativeById["representative"]>;

interface RepresentativeFormProps {
  representative?: EditRepresentativeById["representative"];
  onSave: (
    data: UpdateRepresentativeInput,
    id?: FormRepresentative["id"],
  ) => void;
  error: RWGqlError;
  loading: boolean;
}

const RepresentativeForm = (props: RepresentativeFormProps) => {
  const onSubmit = (data: FormRepresentative) => {
    props.onSave(data, props?.representative?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormRepresentative> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="birthYear"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Birth year
        </Label>

        <NumberField
          name="birthYear"
          defaultValue={props.representative?.birthYear}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="birthYear" className="rw-field-error" />

        <Label
          name="imageUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image url
        </Label>

        <TextField
          name="imageUrl"
          defaultValue={props.representative?.imageUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="imageUrl" className="rw-field-error" />

        <Label
          name="honorificName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Honorific name
        </Label>

        <TextField
          name="honorificName"
          defaultValue={props.representative?.honorificName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="honorificName" className="rw-field-error" />

        <Label
          name="directOrderName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Direct order name
        </Label>

        <TextField
          name="directOrderName"
          defaultValue={props.representative?.directOrderName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="directOrderName" className="rw-field-error" />

        <Label
          name="firstName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          First name
        </Label>

        <TextField
          name="firstName"
          defaultValue={props.representative?.firstName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="firstName" className="rw-field-error" />

        <Label
          name="lastName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Last name
        </Label>

        <TextField
          name="lastName"
          defaultValue={props.representative?.lastName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="lastName" className="rw-field-error" />

        <Label
          name="invertedOrderName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Inverted order name
        </Label>

        <TextField
          name="invertedOrderName"
          defaultValue={props.representative?.invertedOrderName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="invertedOrderName" className="rw-field-error" />

        <Label
          name="active"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Active
        </Label>

        <CheckboxField
          name="active"
          defaultChecked={props.representative?.active}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="active" className="rw-field-error" />

        <Label
          name="stateId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          State id
        </Label>

        <TextField
          name="stateId"
          defaultValue={props.representative?.stateId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={"undefined"}
        />

        <FieldError name="stateId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default RepresentativeForm;
