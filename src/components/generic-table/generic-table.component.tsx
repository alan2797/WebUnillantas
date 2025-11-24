
// import { Table, Input, Select, Button, Row, Col } from "antd";
// import type { FilterConfig, GenericTableProps } from "../../interfaces/components.interface";

// const { Option } = Select;

// export const GenericTable = <T extends object>({
//   columns,
//   data,
//   filters = [],
//   pagination,
//   onSearch,
// }: GenericTableProps<T>) => {
//   const renderFilter = (filter: FilterConfig) => {
//     switch (filter.type) {
//       case "select":
//         return (
//           <Select
//             placeholder={filter.placeholder}
//             onChange={(value) => filter.onFilter?.(value)}
//             allowClear
//             style={{ width: "100%" }}
//           >
//             {filter.options?.map((opt) => (
//               <Option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </Option>
//             ))}
//           </Select>
//         );

//       case "text":
//         return (
//           <Input
//             placeholder={filter.placeholder}
//             onChange={(e) => filter.onFilter?.(e.target.value)}
//           />
//         );

//       case "button":
//         return (
//           <Button type="primary" block onClick={filter.buttonProps?.onClick}>
//             {filter.buttonProps?.text || filter.placeholder}
//           </Button>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       {/* --- Filtros --- */}
//       {filters.length > 0 && (
//         <Row gutter={16} className="mb-4">
//           {filters.map((filter) => (
//             <Col key={filter.key} span={filter.col || 8}>
//               {renderFilter(filter)}
//             </Col>
//           ))}

//           {/* Input de búsqueda global */}
//           {onSearch && (
//             <Col span={8}>
//               <Input.Search
//                 placeholder="Buscar Usuario"
//                 onSearch={onSearch}
//                 allowClear
//               />
//             </Col>
//           )}
//         </Row>
//       )}

//       {/* --- Tabla --- */}
//       <Table
//         rowKey={(record: any) => record.id}
//         columns={columns}
//         dataSource={data}
//         pagination={{
//           current: pagination.currentPage,
//           pageSize: pagination.pageSize,
//           total: pagination.total,
//           onChange: pagination.onPageChange,
//           showSizeChanger: true,
//         }}
//       />
//     </div>
//   );
// };

import React from 'react';
import { Table, Row, Col } from 'antd';
import type { TableProps } from '../../interfaces/components.interface';


const GenericTable: React.FC<TableProps> = ({
  data,
  columns,
  filters = [],
  pagination,
  onPageChange,
  loading = false,
}) => {
  // Convertir columnas al formato de Ant Design
  const antdColumns = columns.map(column => ({
    title: column.label,
    dataIndex: column.key,
    key: column.key,
    sorter: column.sortable,
    render: column.render,
    width: column.width,
    showSorterTooltip: false
  }));

  /* // Manejar cambios en la tabla (ordenamiento)
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    if (onSort && sorter.field && sorter.order) {
      const direction = sorter.order === 'ascend' ? 'asc' : 'desc';
      onSort(sorter.field, direction);
    }
  }; */

  // Configuración de paginación para Ant Design
  const antdPaginationConfig = pagination ? {
    current: pagination.currentPage,
    pageSize: pagination.pageSize,
    total: pagination.totalItems,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) => 
      `${range[0]}-${range[1]} de ${total} registros`,
    pageSizeOptions: pagination.pageSizeOptions || ['10', '20', '50', '100'],
    onChange: onPageChange,
    // onShowSizeChange: (current: number, size: number) => onPageSizeChange?.(size)
  } : false;

  return (
    <div className="generic-table-container">
      {/* Filtros Responsive */}
      {filters.length > 0 && (
        <div className="filters-section">
          <Row gutter={[16, 16]} align="bottom">
            {filters.map((filter, index) => (
              <Col 
                key={filter.key || index} 
                xs={24} 
                sm={12} 
                md={8} 
                lg={filter.span || 6}
              >
                {filter.content}
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Tabla Responsive */}
      <div className="table-section">
        <Table
          columns={antdColumns}
          dataSource={data.map((item, index) => ({ ...item, key: item.id || index }))}
          loading={loading}
          pagination={antdPaginationConfig}
          size="middle"
          bordered
        />
      </div>
    </div>
  );
};

export default GenericTable;