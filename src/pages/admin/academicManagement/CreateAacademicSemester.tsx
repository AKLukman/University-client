import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import UniversityForm from "../../../components/form/UniversityForm";
import { Button, Col, Flex } from "antd";
import UniversitySelect from "../../../components/form/UniversitySelect";
import { monthsOptions } from "../../../constant/months";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicSemesters.schema";

const nameOptions = [
  {
    value: "01",
    label: "Autumn",
  },
  {
    value: "02",
    label: "Summer",
  },
  {
    value: "03",
    label: "Fall",
  },
];
const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));
const CreateAacademicSemester = () => {
  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    const name = nameOptions[Number(data.name) - 1].label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    console.log(semesterData);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UniversityForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <UniversitySelect
            label="Name"
            name="name"
            options={nameOptions}
          ></UniversitySelect>
          <UniversitySelect
            label="Year"
            name="year"
            options={yearOptions}
          ></UniversitySelect>
          <UniversitySelect
            label="Start Month"
            name="startMonth"
            options={monthsOptions}
          ></UniversitySelect>
          <UniversitySelect
            label="End Month"
            name="endMonth"
            options={monthsOptions}
          ></UniversitySelect>
          <Button htmlType="submit">Submit</Button>
        </UniversityForm>
      </Col>
    </Flex>
  );
};

export default CreateAacademicSemester;
