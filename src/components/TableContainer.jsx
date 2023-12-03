import { useEffect, useState } from "react";
import DeleteIcon from "../assets/DeleteIcon.svg";
import EditIcon from "../assets/EditIcon.svg";
import SaveIcon from "../assets/SaveIcon.svg";

const TableContainer = ({
  userData,
  setUserData,
  filteredUserData,
  setFilteredUserData,
  currentPage,
}) => {
  // to maintain the checkbox state of the title checkbox
  const [isTitleCheckboxChecked, setIsTitleCheckboxChecked] = useState(false);

  // to maintain the editable row
  const [editableRows, setEditableRows] = useState({});

  // to maintain editable row data
  const [rowData, setRowData] = useState(null);

  // to maintian the count of selected rows
  const [selectedRows, setSelectedRows] = useState(0);

  useEffect(() => {
    rowData === null && setEditableRows(() => ({}));
  }, [rowData]);

  // to handle edit click
  const handleEditClick = (userId) => {
    if (rowData !== null) return alert("Please Save the data first");

    setRowData(() => null);
    setEditableRows(() => ({
      [userId]: true,
    }));
    setRowData(() => userData?.find((user) => user.id === userId));
  };

  // to handle field change of the editable row
  const handleFieldChange = (userId, key, value) => {
    setRowData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // to handle save click
  const handleSaveClick = (userId) => {
    setUserData((prevUserData) =>
      prevUserData.map((user) =>
        user.id === userId ? { ...user, ...rowData } : user
      )
    );
    setRowData(() => null);
  };

  // to handle delete click
  const handleDeleteClick = (userId) => {
    setUserData((prevUserData) =>
      prevUserData.filter((user) => user.id !== userId)
    );
  };

  // to handle delte selected button
  const handleDeleteSelected = () => {
    if (isTitleCheckboxChecked) {
      setUserData((prev) => {
        const temp = [...prev];
        temp.splice(currentPage * 10 - 10, 10);
        return temp;
      });
      setSelectedRows(() => 0);
    } else {
      setUserData(() => userData?.filter((user) => !user?.isChecked));
      setSelectedRows(() => 0);
    }
  };

  useEffect(() => {
    setFilteredUserData(() => userData);
  }, [userData]);

  return (
    <div>
      <table className="w-full border font-poppins">
        <thead>
          <tr className="text-base h-12 bg-[#7c6f6f20] border-b-2 border-b-black ">
            <th className="font-medium border min-w-[3vw]">
              <input
                onChange={() => {
                  setIsTitleCheckboxChecked(!isTitleCheckboxChecked);
                  setUserData((prevUserData) =>
                    prevUserData.map((user) => ({
                      ...user,
                      isChecked: !isTitleCheckboxChecked,
                    }))
                  );
                  setSelectedRows(() => 10);
                }}
                checked={isTitleCheckboxChecked}
                type="checkbox"
                name=""
                id=""
                className="w-5 h-5 cursor-pointer mt-2"
              />
            </th>
            <th className="font-semibold border min-w-[15vw]">Name</th>
            <th className="font-semibold border min-w-[25vw]">Email</th>
            <th className="font-semibold border min-w-[15vw]">Role</th>
            <th className="font-semibold border ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUserData
            ?.slice(currentPage * 10 - 10, currentPage * 10)
            ?.map((user, index) => (
              <tr
                key={user?.id}
                className={`h-11 text-sm border-b ${
                  user?.isChecked ? "bg-[#F9FAFC]" : ""
                }`}
              >
                <td className="text-center border">
                  <input
                    onChange={(e) => {
                      setUserData((prevUserData) =>
                        prevUserData?.map((u) =>
                          u?.id === user?.id
                            ? { ...u, isChecked: !u?.isChecked }
                            : u
                        )
                      );
                      setSelectedRows((prevSelectedRows) => {
                        return e.target.checked
                          ? prevSelectedRows + 1
                          : prevSelectedRows - 1;
                      });
                    }}
                    checked={user?.isChecked}
                    type="checkbox"
                    className="h-5 w-5 text-center mt-2 cursor-pointer"
                  />
                </td>
                <td className="text-center border">
                  {editableRows[user?.id] ? (
                    <input
                      className="border border-black rounded pl-1 h-8 w-40 outline-none"
                      type="text"
                      value={rowData?.name}
                      onChange={(e) =>
                        handleFieldChange(user?.id, "name", e.target.value)
                      }
                    />
                  ) : (
                    user?.name
                  )}
                </td>
                <td className="text-center border">
                  {editableRows[user?.id] ? (
                    <input
                      className="w-60 rounded border border-black h-8 pl-1 outline-none"
                      type="text"
                      value={rowData?.email}
                      onChange={(e) =>
                        handleFieldChange(user?.id, "email", e.target.value)
                      }
                    />
                  ) : (
                    user?.email
                  )}
                </td>
                <td className="text-center border">
                  {editableRows[user?.id] ? (
                    <select
                      defaultValue={rowData?.role}
                      onChange={(e) =>
                        handleFieldChange(user?.id, "role", e.target.value)
                      }
                      className="h-8 rounded border border-black w-36 outline-none"
                    >
                      <option hidden>Select Role</option>
                      <option value="member">member</option>
                      <option value="admin">admin</option>
                    </select>
                  ) : (
                    user?.role
                  )}
                </td>
                <td className="flex items-center justify-center gap-2 h-11">
                  <img
                    className="cursor-pointer"
                    src={EditIcon}
                    alt="edit icon"
                    onClick={() => handleEditClick(user?.id)}
                  />
                  {editableRows[user?.id] ? (
                    <img
                      className="cursor-pointer"
                      src={SaveIcon}
                      alt="save icon"
                      onClick={() => handleSaveClick(user?.id)}
                    />
                  ) : (
                    <img
                      className="cursor-pointer"
                      src={DeleteIcon}
                      alt="delete icon"
                      onClick={() => handleDeleteClick(user?.id)}
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-2 flex gap-3 text-sm items-center">
        <p className="py-1">
          {selectedRows} of {filteredUserData.length} Selected
        </p>
        {selectedRows > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="border border-blue-100 rounded py-1 px-3 bg-red-500 text-white text-sm "
          >
            Delete Selected
          </button>
        )}
      </div>
    </div>
  );
};

export default TableContainer;
