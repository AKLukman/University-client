import { Button, Divider } from "antd";
import UniversityForm from "../../../components/form/UniversityForm";
import UniversityInput from "../../../components/form/UniversityInput";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { useAddAcademicFacultyMutation } from "../../../redux/features/academicManagement/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

const CreateAcademicFaculty = () => {
  const [createFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const facultyData = {
      name: data.name,
    };
    const toastId = toast.loading("Creating...");
    try {
      const res = (await createFaculty(facultyData)) as TResponse<string>;
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Facaulty created successfully", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Somthing went wrong", { id: toastId });
    }
  };
  return (
    <div>
      <Divider>Create Academic Faculty</Divider>
      <UniversityForm onSubmit={onSubmit}>
        <UniversityInput name="name" label="Name" type="text"></UniversityInput>
        <Button htmlType="submit">Submit</Button>
      </UniversityForm>
    </div>
  );
};

export default CreateAcademicFaculty;
