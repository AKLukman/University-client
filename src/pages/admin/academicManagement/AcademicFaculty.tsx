import { Button, Table, TableColumnsType } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/academicManagement/academicManagement.api";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
type TTableData = Pick<TAcademicFaculty, "name">;

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
const AcademicFaculty = () => {
  const {
    data: facultiesData,

    isFetching,
  } = useGetAcademicFacultiesQuery(undefined);
  const tableData = facultiesData?.data?.map(({ _id, name }) => ({
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

export default AcademicFaculty;
