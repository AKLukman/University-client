import { FieldValues, SubmitHandler } from "react-hook-form";
import UniversityForm from "../../../components/form/UniversityForm";
import UniversityInput from "../../../components/form/UniversityInput";
import { Button, Col, Divider, Row } from "antd";
import UniversitySelect from "../../../components/form/UniversitySelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/academicManagement/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

const CreateAacademicDepartment = () => {
  const { data: facultyData, isLoading } =
    useGetAcademicFacultiesQuery(undefined);
  const facultiesOptions = facultyData?.data?.map((item) => ({
    value: item?._id,
    label: item?.name,
  }));
  const [createDepartment] = useAddAcademicDepartmentMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const facultyData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };
    const toastId = toast.loading("Creating...");
    try {
      const res = (await createDepartment(facultyData)) as TResponse<string>;
      if (res.error) {
        toast.error(res?.error?.data.message, { id: toastId });
      } else {
        toast.success("Department created successfully!", { id: toastId });
      }
      console.log(res);
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };
  return (
    <Row>
      <Col span={24}>
        <UniversityForm onSubmit={onSubmit}>
          <Divider>Create Aacademic Department</Divider>
          <Row gutter={8}>
            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <UniversityInput
                name="name"
                label="Name"
                type="text"
              ></UniversityInput>
            </Col>
            <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
              <UniversitySelect
                name="academicFaculty"
                label="Academic Faculty"
                options={facultiesOptions}
                disabled={isLoading}
              ></UniversitySelect>
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </UniversityForm>
      </Col>
    </Row>
  );
};

export default CreateAacademicDepartment;
