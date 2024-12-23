import { Button, Table, TableColumnsType } from "antd";
import { TAcademicDepartment } from "../../../types/academicManagement.type";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/academicManagement/academicManagement.api";

type TTableData = Pick<TAcademicDepartment, "name">;

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
  },

  {
    title: "Action",
    key: "x",
    render: () => {
      return (
        <div>
          <Button>Update</Button>
        </div>
      );
    },
  },
];

const AacademicDepartment = () => {
  const {
    data: academicDepartmentData,

    isFetching,
  } = useGetAcademicDepartmentsQuery(undefined);
  const tableData = academicDepartmentData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));
  return (
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AacademicDepartment;
