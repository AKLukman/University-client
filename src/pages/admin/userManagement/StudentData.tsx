import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParams } from "../../../types/global";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { TStudent } from "../../../types/userManagemet.type";
import { Link } from "react-router-dom";

type TTableData = Pick<TStudent, "name" | "id" | "email">;

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    key: "name",
    dataIndex: "firstName",
  },
  {
    title: "Email",
    key: "email",
    dataIndex: "email",
  },

  {
    key: "student Id",
    title: "Student Id",
    dataIndex: "id",
  },

  {
    title: "Action",
    key: "x",
    render: (item) => {
      return (
        <Space>
          <Link to={item.key}>
            <Button>Details</Button>
          </Link>
          <Button>Update</Button>
          <Button>Block</Button>
        </Space>
      );
    },
    width: "1%",
  },
];

const StudentData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: studentData,

    isFetching,
  } = useGetAllStudentsQuery([
    { name: "limit", value: 1 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const metaData = studentData?.meta;
  const tableData = studentData?.data?.map(({ _id, name, id, email }) => ({
    key: _id,
    id,
    firstName: name.firstName,
    email,
  }));

  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];
      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });
      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: item });
      });
      setParams(queryParams);
    }
  };

  return (
    <>
      <Table<TTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      <Pagination
        total={metaData?.total}
        pageSize={metaData?.limit}
        onChange={(value) => setPage(value)}
        current={page}
      />
    </>
  );
};

export default StudentData;
