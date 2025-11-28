// components/TableCustom.tsx
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  Table,
  Button,
  Input,
  Tooltip,
  Col,
  Row,
  Dropdown,
  Menu,
  Select,
  Skeleton,
  type InputRef,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import React, { useState, useMemo, useEffect, useRef } from "react";
import type { TableCustomProps } from "../../interfaces/components.interface";
import Can from "../can/can.page";

export const TableCustom = <T extends { [key: string]: any }>({
  columns,
  dataSource,
  rowKey,
  pageSize = 10,
  searchable = false,
  selectable = false,
  onView,
  onEdit,
  onDelete,
  extraActions,
  showNewButton,
  newButtonLabel,
  onNewButtonClick,
  pageSizeOptions = [5, 10, 20],
  onPageSizeChange,
  showPagination,
  showPageSize,
  editableColumns = [],
  onSaveEdit,
  scrollY,
  permissionsNew = []
}: TableCustomProps<T>) => {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [editingKey, setEditingKey] = useState<React.Key | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<any>("");
  const inputRef = useRef<InputRef>(null);
  const isLoading = !dataSource;
  const skeletonRows = Array.from({ length: 3 }, (_, i) => ({ id: `skeleton-${i}` })) as unknown as T[];

  const startEditing = (key: React.Key, field: string, currentValue: any) => {
    setEditingKey(key);
    setEditingField(field);
    setEditingValue(currentValue);
  };

  const cancelEditing = () => {
    setEditingKey(null);
    setEditingField(null);
    setEditingValue("");
  };

  const saveEditing = () => {
    if (editingKey && editingField && onSaveEdit) {
      const record = dataSource?.find(item => item[rowKey] === editingKey);
      if (record) {
        onSaveEdit(record, editingField, editingValue);
      }
    }
    cancelEditing();
  };

  useEffect(() => {
    if (editingKey && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingKey, editingField]);

  const enhancedColumns: ColumnsType<T> = useMemo(() => {
    const processedColumns = columns.map(col => {
      const dataIndex = col.key as string;
      
      if (editableColumns.includes(dataIndex)) {
        return {
          ...col,
          render: (value: any, record: T, index: number) => {
            const key = record[rowKey];
            const isEditing = editingKey === key && editingField === dataIndex;

            if (isEditing) {
              return (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Input
                    ref={inputRef}
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onPressEnter={saveEditing}
                    size="small"
                    style={{ minWidth: 120 }}
                  />
                  <div style={{ display: "flex", gap: 4 }}>
                    <Tooltip title="Confirmar">
                      <Button
                        type="text"
                        size="small"
                        icon={<CheckOutlined style={{ color: "#52c41a" }} />}
                        onClick={saveEditing}
                      />
                    </Tooltip>
                    <Tooltip title="Cancelar">
                      <Button
                        type="text"
                        size="small"
                        icon={<CloseOutlined style={{ color: "#ff4d4f" }} />}
                        onClick={cancelEditing}
                      />
                    </Tooltip>
                  </div>
                </div>
              );
            }

            return (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>{value}</span>
                <Tooltip title="Editar">
                  <Button
                    type="text"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => startEditing(key, dataIndex, value)}
                    style={{ opacity: 0.7 }}
                  />
                </Tooltip>
              </div>
            );
          },
        };
      }

      return col;
    });
    const hasActions = onView || onEdit || onDelete || extraActions;

    if (!hasActions) {
      return processedColumns;
    }

    const actionColumn = {
      title: "Acciones",
      key: "actions",
      fixed: "right" as const,
      render: (_: any, record: T) => {
        if (!isMobile) {
          return (
            <div style={{ display: "flex", gap: 8 }}>
              {onView && (
                <Tooltip title="Ver">
                  <Button
                    type="text"
                    icon={<EyeOutlined />}
                    onClick={() => onView(record)}
                  />
                </Tooltip>
              )}
              {onEdit && (
                <Tooltip title="Editar">
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(record)}
                  />
                </Tooltip>
              )}
              {onDelete && (
                <Tooltip title="Eliminar">
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => onDelete(record)}
                  />
                </Tooltip>
              )}
              {extraActions && extraActions(record)}
            </div>
          );
        } else {
          const menuItems = [];
          if (onView)
            menuItems.push({
              key: "view",
              label: "Ver",
              onClick: () => onView(record),
            });
          if (onEdit)
            menuItems.push({
              key: "edit",
              label: "Editar",
              onClick: () => onEdit(record),
            });
          if (onDelete)
            menuItems.push({
              key: "delete",
              label: "Eliminar",
              onClick: () => onDelete(record),
            });
          if (extraActions) {
            const extra = extraActions(record);
            const getLabelFromNode = (node: React.ReactNode): string => {
              if (React.isValidElement(node)) {
                return (node.props as { title?: string })?.title ?? "Acción";
              }
              if (typeof node === "string") return node;
              return "Acción";
            };
            if (Array.isArray(extra)) {
              extra.forEach((node, i) => {
                menuItems.push({
                  key: `extra-${i}`,
                  label: getLabelFromNode(node),
                  onClick: () => {},
                });
              });
            } else {
              menuItems.push({
                key: "extra-0",
                label: getLabelFromNode(extra),
                onClick: () => console.log("Extra action clicked", record),
              });
            }
          }
          return (
            <Dropdown
              overlay={<Menu items={menuItems} />}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Button type="text" icon={<EllipsisOutlined />} />
            </Dropdown>
          );
        }
      },
    };

    return [...processedColumns, actionColumn];
  }, [columns, editableColumns, editingKey, editingField, editingValue, onSaveEdit, rowKey, dataSource]);

  const handlePageSizeChange = (size: number) => {
    setCurrentPageSize(size);
    if (onPageSizeChange) onPageSizeChange(size);
  };

  const filteredData = useMemo(() => {
    if (!searchable || !searchText) return dataSource;
    return dataSource?.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, dataSource, searchable]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skeletonColumns = enhancedColumns.map(col => ({
    ...col,
    render: (_: any) => (
      <Skeleton.Input active size="small" style={{ width: "100%" }} />
    ),
  }));

  const rowSelection: TableRowSelection<T> | undefined = selectable
    ? {
        selectedRowKeys,
        onChange: (keys: any) => setSelectedRowKeys(keys),
      }
    : undefined;

  return (
    <div>
      {/* ... tu JSX existente para controles */}
      {(searchable || showNewButton || showPageSize) && (
        <Row align="middle" style={{ marginBottom: 16, gap: 8 }}>
          {showPageSize && (
            <Col>
              <Select
                value={currentPageSize}
                onChange={(value: any) => setCurrentPageSize(value)}
                options={pageSizeOptions.map((item) => ({label: String(item), value: item}))}
                size="large"
                style={{width: "100%", minWidth: 120}}
              />
            </Col>
          )}
          <Col flex="auto" />
          {(searchable || showNewButton) && (
            <Row align="middle" style={{ gap: 8 }}>
              {searchable && (
                <Col>
                  <Input
                    placeholder="Buscar..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    size="large"
                  />
                </Col>
              )}
              {showNewButton && (
                <Can permission={permissionsNew}>
                  <Col>
                    <Button
                      type="primary"
                      size="large"
                      onClick={onNewButtonClick}
                      style={{width: "100%"}}
                    >
                      {newButtonLabel || "Registrar Nuevo"}
                    </Button>
                  </Col>
                </Can>
                
              )}
            </Row>
          )}
        </Row>
      )}

      <Table
        columns={isLoading ? skeletonColumns : enhancedColumns}
        dataSource={isLoading ? skeletonRows : filteredData}
        pagination={showPagination ? {
          pageSize: currentPageSize,
          pageSizeOptions: pageSizeOptions.map(String),
          onShowSizeChange: handlePageSizeChange,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
          locale: { items_per_page: "" },
          position: ["bottomRight"],
        } : false}
        scroll={{ x: "max-content",y: scrollY || undefined}}
        rowSelection={rowSelection}
        rowKey={rowKey}
        
      />
    </div>
  );
};