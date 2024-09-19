import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Tag } from "primereact/tag";
import { users_list, user_active, user_delete } from "../../axios/api";
import { toast } from "react-toastify";
import Sidebar from "../../Sidebar";

const ListUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null },
    first_name: { value: null, matchMode: "contains" }, // Add filter for first_name
    last_name: { value: null, matchMode: "contains" }, // Add filter for last_name
    emp_id: { value: null, matchMode: "contains" },
    email: { value: null, matchMode: "contains" },
    campus: { value: null, matchMode: "contains" },
    department: { value: null, matchMode: "contains" },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await users_list();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const startEditing = (user) => {
    // const selectedUser = users.find((user) => user.id === userId);
    console.log(user)
    navigate("/registerSingleuser", { state: { user } });
  };



  const handleDeleteUser = async (id) => {
    try {
      await user_delete(id);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting User:", error);
    }
  };

  const toggleStatus = async (user) => {
    try {
      await user_active(user.id);
      setUsers(
        users.map((u) => (u.id === user.id ? { ...u, status: !u.status } : u))
      );
      toast.success(
        user.status
          ? "User deactivated successfully!"
          : "User activated successfully!"
      );
    } catch (error) {
      console.error("Error toggling User status:", error);
    }
  };

  const actionBodyTemplate = (rowData) => (
    <div>
      <FaEdit
        className="text-warning me-3 cursor-pointer"
        onClick={() => startEditing(rowData)}
        title="Edit"
      />
      <FaTrash
        className="text-danger cursor-pointer"
        onClick={() => handleDeleteUser(rowData.id)}
        title="Delete"
      />
    </div>
  );

  const statusBodyTemplate = (rowData) => (
    <Tag
      value={rowData.status ? "Active" : "Inactive"}
      severity={rowData.status ? "success" : "danger"}
      onClick={() => toggleStatus(rowData)}
    />
  );

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);

    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
  };

  const renderHeader = () => (
    <div className="d-flex justify-content-between align-items-center">
      <div className="fw-bold fs-5">User List</div>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
        />
      </span>
    </div>
  );

  // Filter input for first_name
  const firstNameFilterTemplate = (options) => (
    <InputText
      value={options.value || ""}
      onChange={(e) => options.filterApplyCallback(e.target.value)}
      placeholder="Search by First Name"
    />
  );

  // Filter input for last_name
  const lastNameFilterTemplate = (options) => (
    <InputText
      value={options.value || ""}
      onChange={(e) => options.filterApplyCallback(e.target.value)}
      placeholder="Search by Last Name"
    />
  );

  const header = renderHeader();

  return (
    <div>
      <div className="container-fluid mt-1">
        <div className="row">
          <div className="col-md-2 p-0">
            <Sidebar />
          </div>
          <div className="col-md-10 mt-1 pt-5">
            <div className="container mt-3 p-5">
              <div className="table-container">
              <DataTable
                  value={users}
                  paginator
                  rows={10}
                  dataKey="id"
                  emptyMessage="No User found."
                  filters={filters}
                  filterDisplay="row"
                >
                  {/* Column for first name */}
                  <Column
                    field="first_name"
                    header="First Name"
                    filter
                    filterElement={firstNameFilterTemplate}
                    filterField="first_name"
                    filterPlaceholder="Search First Name"
                  />

                  {/* Column for last name */}
                  <Column
                    field="last_name"
                    header="Last Name"
                    filter
                    filterElement={lastNameFilterTemplate}
                    filterField="last_name"
                    filterPlaceholder="Search Last Name"
                  />

                  <Column
                    field="emp_id"
                    header="Emp ID"
                    filter
                    filterPlaceholder="Search ID"
                  />
                  <Column
                    field="email"
                    header="Email"
                    filter
                    filterPlaceholder="Search email"
                  />
                  <Column
                    field="campus"
                    header="Campus"
                    filter
                    filterPlaceholder="Search campus"
                  />
                  <Column
                    field="department"
                    header="Department"
                    filter
                    filterPlaceholder="Search Department"
                  />
                  <Column
                    field="status"
                    header="Status"
                    body={statusBodyTemplate}
                  />
                  <Column header="Actions" body={actionBodyTemplate} />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListUser;
