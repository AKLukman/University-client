import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import UniversityForm from "../../../components/form/UniversityForm";
import UniversityInput from "../../../components/form/UniversityInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import UniversitySelect from "../../../components/form/UniversitySelect";
import {
  bloodGroupsOptions,
  gendersOptions,
} from "../../../constant/global.constant";
import UniDatePicker from "../../../components/form/UniDatePicker";
import {
  useGetAcademicDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/academicManagement/academicManagement.api";
import { useAddStudentsMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

// {
//     "password": "student123",
//     "student": {
//         "name": {
//             "firstName": "I am ",
//             "middleName": "Student",
//             "lastName": "Number 1"
//         },
//         "gender": "male",
//         "dateOfBirth": "1990-01-01",
//         "email": "student2@gmail.com",
//         "contactNo": "1235678",
//         "emergencyContactNo": "987-654-3210",
//         "bloogGroup": "A+",
//         "presentAddress": "123 Main St, Cityville",
//         "permanentAddress": "456 Oak St, Townsville",
//         "guardian": {
//             "fatherName": "James Doe",
//             "fatherOccupation": "Engineer",
//             "fatherContactNo": "111-222-3333",
//             "motherName": "Mary Doe",
//             "motherOccupation": "Teacher",
//             "motherContactNo": "444-555-6666"
//         },
//         "localGuardian": {
//             "name": "Alice Johnson",
//             "occupation": "Doctor",
//             "contactNo": "777-888-9999",
//             "address": "789 Pine St, Villageton"
//         },
//         "admissionSemester": "65b0104110b74fcbd7a25d92",
//         "academicDepartment": "65b00fb010b74fcbd7a25d8e"
//     }
// }
const studentDefaultValues = {
  name: {
    firstName: "I am ",
    middleName: "Student",
    lastName: "Number 1",
  },
  gender: "male",

  bloogGroup: "A+",
  email: "abc@fmail.com",
  contactNo: "1235678",
  emergencyContactNo: "987-654-3210",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",

  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "111-222-3333",
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContactNo: "444-555-6666",
  },

  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "777-888-9999",
    address: "789 Pine St, Villageton",
  },

  // academicDepartment: "65b4acae3dc8d4f3ad83e416",
};

const CreateStudent = () => {
  const { data: semesterData, isLoading: semestIsLoading } =
    useGetAllSemestersQuery(undefined);
  const { data: academicDeaprtmentData, isLoading: departmentIsLoading } =
    useGetAcademicDepartmentsQuery(undefined);
  const semesterOptions = semesterData?.data?.map((item) => ({
    value: item?._id,
    label: `${item?.name} ${item?.year}`,
  }));
  const academicDeaprtmentOptions = academicDeaprtmentData?.data?.map(
    (item) => ({
      value: item?._id,
      label: `${item?.name}`,
    })
  );

  const [addStudent, { error }] = useAddStudentsMutation();

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const studentData = {
      password: "student123",
      student: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);
    addStudent(formData);
    console.log(error);
    // console.log(Object.fromEntries(formData));
    const toastId = toast.loading("Creating...");
    try {
      const res = (await addStudent(formData)) as TResponse<string>;
      if (res.error) {
        toast.error(res?.error?.data.message, { id: toastId });
      } else {
        toast.success("Student created successfully!", { id: toastId });
      }
      console.log(res);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };
  return (
    <Row>
      <Col span={24}>
        <UniversityForm
          onSubmit={onsubmit}
          defaultValues={studentDefaultValues}
        >
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="name.firstName"
                label="First Name"
              ></UniversityInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="name.middleName"
                label="Middle Name"
              ></UniversityInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="name.lastName"
                label="Last Name"
              ></UniversityInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversitySelect
                options={gendersOptions}
                name="gender"
                label="Gender"
              ></UniversitySelect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniDatePicker
                name="dateOfBirth"
                label="Date of Birth"
              ></UniDatePicker>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversitySelect
                options={bloodGroupsOptions}
                name="bloogGroup"
                label="Blood Group"
              ></UniversitySelect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    ></Input>
                  </Form.Item>
                )}
              ></Controller>
            </Col>
          </Row>
          <Divider> Contact Info </Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="email"
                label="Email"
              ></UniversityInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="contactNo"
                label="Contact Number"
              ></UniversityInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No"
              ></UniversityInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="presentAddress"
                label="Present Address"
              ></UniversityInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="permanerntAddress"
                label="Permanent Address"
              ></UniversityInput>
            </Col>
          </Row>
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              ></UniversityInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              ></UniversityInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father Contact Number"
              ></UniversityInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              ></UniversityInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              ></UniversityInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother Contact Number"
              ></UniversityInput>
            </Col>
          </Row>
          <Divider>Local Guardian </Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="localGuardian.name"
                label="Name"
              ></UniversityInput>
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              ></UniversityInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact Number"
              ></UniversityInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversityInput
                type="text"
                name="localGuardian.address"
                label="Address"
              ></UniversityInput>
            </Col>
          </Row>
          <Divider>Aacademic Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversitySelect
                options={semesterOptions}
                disabled={semestIsLoading}
                name="admissionSemester"
                label="Admission Semester"
              ></UniversitySelect>
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniversitySelect
                options={academicDeaprtmentOptions}
                name="academicDepartment"
                label="Academic Department"
                disabled={departmentIsLoading}
              ></UniversitySelect>
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </UniversityForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
