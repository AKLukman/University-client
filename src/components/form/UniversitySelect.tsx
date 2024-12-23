import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
};

const UniversitySelect = ({ label, name, options, disabled }: TSelectProps) => {
  return (
    <Controller
      name={name}
      //   defaultValue={options.}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>*{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default UniversitySelect;
