import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/user";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@material-ui/core";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/user/delete-user/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });

    dispatch(getAllUsers());
  };

  const handleToggleBlock = async (id, isBlocked) => {
    const endpoint = isBlocked ? "admin-unblock-user" : "admin-block-user";
    await axios
      .put(`${server}/user/${endpoint}/${id}`, {}, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
      });
    dispatch(getAllUsers());
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "User Role",
      type: "text",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Active"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "block",
      flex: 0.8,
      minWidth: 120,
      headerName: "Block/Unblock",
      sortable: false,
      renderCell: (params) => {
        const isBlocked = params.row.status === "Blocked";
        return (
          <Button
            onClick={() => handleToggleBlock(params.id, isBlocked)}
            style={{
              color: isBlocked ? "#4caf50" : "#f44336",
              textTransform: "none",
            }}
          >
            {isBlocked ? "Unblock" : "Block"}
          </Button>
        );
      },
    },
    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 0.6,
      minWidth: 100,
      headerName: "Delete User",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  users &&
    users.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        joinedAt: item.createdAt.slice(0, 10),
        status: item.isBlocked ? "Blocked" : "Active",
      });
    });

  return (
    <div className="w-full page-container">
      <div className="page-header">
        <div className="flex items-center">
          <h2 className="section-title">All Users</h2>
          <span className="count-badge">{row.length}</span>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#EDE8E0] overflow-hidden">
        <div className="data-grid-premium">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-content w-[90%] 800px:w-[420px] p-0" onClick={(e) => e.stopPropagation()}>
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 flex items-center justify-center">
                <AiOutlineDelete size={28} className="text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">
                Delete User?
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                This action cannot be undone. Are you sure?
              </p>
              <div className="flex items-center gap-3 justify-center">
                <button
                  className="btn-premium-outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn-premium !bg-gradient-to-r !from-red-500 !to-red-600 !shadow-red-500/25"
                  onClick={() => setOpen(false) || handleDelete(userId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
