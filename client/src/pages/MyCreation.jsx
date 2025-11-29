import React, { useContext, useEffect, useState } from "react";
import api from "../API/api";
import {
  FaWindowClose,
  FaDotCircle
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ModelContext } from "../context/ModelContext";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const MyCreation = () => {
  const { task, setTask, getTask, loading, name } =
    useContext(ModelContext);

  const [showMenu, setShowMenu] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // Edit State
  const [editValue, setEditValue] = useState({
    _id: "",
    editTaskValue: "",
    editDetailvalue: "",
    editStatusvalue: "pending",
  });

  const { editTaskValue, editDetailvalue, editStatusvalue } = editValue;

  // Toggle 3-dots popup menu
  const toggleMenu = (taskObj) => {
    setShowMenu(showMenu === taskObj._id ? null : taskObj._id);
  };

  useEffect(() => {
    getTask();
  }, []);

  // Delete Task
  const handleDelete = async (data) => {
    try {
      await api.delete(`/task/${data._id}`);

      const deletedList = task.filter((t) => t._id !== data._id);
      setTask(deletedList);

      toast.success(res.data.message || "Task Deleted", {
        position: "top-center",
        autoClose:3000,
        style:{
          backgroundColor:'black',
          color:'white'
        }
      });
    } catch (error) {
       toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-center",
        autoClose:3000,
        style:{
          backgroundColor:'black',
          color:'white'
        }
      });
    }
  };

  // Open Edit
  const editTask = (data) => {
    setIsEdit(true);
    setEditValue({
      _id: data._id,
      editTaskValue: data.task,
      editDetailvalue: data.detail,
      editStatusvalue: data.status,
    });
  };

  // Edit Input Change
  const editHandlechange = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value });
  };

  // Submit Updated Task
  const editHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/task/${editValue._id}`, {
        task: editTaskValue,
        detail: editDetailvalue,
        status: editStatusvalue,
      });

      // Update in frontend
      const updated = task.map((t) =>
        t._id === editValue._id
          ? {
              ...t,
              task: editTaskValue,
              detail: editDetailvalue,
              status: editStatusvalue,
            }
          : t
      );

      setTask(updated);
      setIsEdit(false);

      toast.success(res.data.message || "Task updated", {
        position: "top-center",
        autoClose:3000,
        style:{
          backgroundColor:'black',
          color:'white'
        }
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-center",
        autoClose:3000,
        style:{
          backgroundColor:'black',
          color:'white'
        }
      });
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center fw-bold mb-4">In-Progress Tasks</h3>

      {loading && (
        <p className="text-center text-secondary">Loading...</p>
      )}

      {!loading && task.length === 0 && (
        <p className="text-center text-muted">No tasks found.</p>
      )}

      {/* Task Cards */}
      {task.map((data) => (
        <div
          key={data._id}
          className="card shadow-sm mb-3 p-3 border-0"
          style={{ borderRadius: "15px" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="fw-bold text-capitalize mb-0">
              {data.task}
            </h5>

            <button
              className="btn btn-sm text-danger"
              onClick={() => handleDelete(data)}
            >
              <FaWindowClose />
            </button>
          </div>

          {/* Detail & 3 dots */}
          <p className="mt-2 text-secondary text-capitalize">
            {data.detail}
            <button
              className="btn btn-sm float-end"
              onClick={() => toggleMenu(data)}
            >
              <BsThreeDotsVertical />
            </button>
          </p>

          <p>
            <span className="text-success fw-bold">
              Created by {name}
            </span>
            <span className="float-end">
              Status{" "}
              <span
                className={
                  data.status === "completed"
                    ? "text-success"
                    : "text-danger"
                }
              >
                <FaDotCircle /> {data.status}
              </span>
            </span>
          </p>

          {/* Popup Menu */}
          <div className="position-relative">
            {showMenu === data._id && (
              <div
                className="position-absolute bg-white shadow p-2 rounded"
                style={{ right: 0, top: "100%", zIndex: 10 }}
              >
                <button
                  className="dropdown-item"
                  onClick={() => editTask(data)}
                >
                  ✏️ Edit
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      <Modal show={isEdit} onHide={() => setIsEdit(false)} centered>
        <Modal.Title className="p-3">
          Edit Task
          <button
            className="btn float-end"
            onClick={() => setIsEdit(false)}
          >
            <FaWindowClose />
          </button>
        </Modal.Title>

        <form onSubmit={editHandleSubmit}>
          <Modal.Body>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="text"
                name="editTaskValue"
                value={editTaskValue}
                onChange={editHandlechange}
                id="task"
              />
              <label htmlFor="task">Task</label>
            </div>

            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="text"
                name="editDetailvalue"
                value={editDetailvalue}
                onChange={editHandlechange}
                id="detail"
              />
              <label htmlFor="detail">Task Details</label>
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-control"
                name="editStatusvalue"
                value={editStatusvalue}
                onChange={editHandlechange}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsEdit(false)}
            >
              Close
            </button>
            <button type="submit" className="btn btn-success">
              Update
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default MyCreation;
