import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/academicManagement/academicManagement.api";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParams } from "../../../types/global";

type TTableData = Pick<
  TAcademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
>;

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    filters: [
      {
        text: "Autumn",
        value: "Autumn",
      },
      {
        text: "Summer",
        value: "Summer",
      },
      {
        text: "Fall",
        value: "Fall",
      },
    ],
  },
  {
    key: "year",
    title: "Year",
    dataIndex: "year",
    defaultSortOrder: "descend",
    sorter: (a, b) => Number(a.year) - Number(b.year),
    filters: [
      {
        text: "2024",
        value: "2024",
      },
      {
        text: "2025",
        value: "2025",
      },
      {
        text: "2026",
        value: "2026",
      },
    ],
  },
  {
    key: "start Month",
    title: "Start Month",
    dataIndex: "startMonth",
  },
  {
    key: "end Month",
    title: "End Month",
    dataIndex: "endMonth",
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

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const {
    data: semesterData,

    isFetching,
  } = useGetAllSemestersQuery(params);
  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

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
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
