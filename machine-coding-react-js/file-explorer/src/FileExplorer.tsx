import React, { useState } from "react";

type FileType = "file" | "folder";

interface Item {
  id: string;
  name: string;
  isFolder: boolean;
  isEditing?: boolean;
}

interface IType {
  explorer: {
    id: string;
    name: string;
    isFolder: boolean;
    items?: Item[];
    isEditing?: boolean;
  };
  setExplorer: Function;
}

const FileExplorer = ({ explorer, setExplorer }: IType) => {
  const [value, setValue] = useState("");
  const [toggle, setToggle] = useState(false);
  const [openInput, setOpenInput] = useState({
    visible: false,
    isFolder: false,
  });

  const handleOpenInput = (type: FileType) => {
    setOpenInput((prev) => ({
      ...prev,
      visible: true,
      isFolder: type === "folder",
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string,
    type: FileType
  ) => {
    if (e.key !== "Enter") return;

    // setExplorer(prev => (

    // ))
  };

  return (
    <div className="explorer">
      {explorer.isFolder ? (
        <>
          <span className="folder">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setToggle((prev) => !prev)}
            >
              📁{explorer.name}
            </span>
            <button onClick={() => handleOpenInput("file")}>file</button>
            <button onClick={() => handleOpenInput("folder")}>folder</button>
          </span>
          <br />
          {openInput.isFolder && openInput.visible && (
            <input
              placeholder="folder name"
              onChange={handleChange}
              onKeyDown={(e) => handleEnter(e, explorer.id, "folder")}
            />
          )}
          {!openInput.isFolder && openInput.visible && (
            <input
              placeholder="file name"
              onChange={handleChange}
              onKeyDown={(e) => handleEnter(e, explorer.id, "file")}
            />
          )}
          <div
            style={{ paddingLeft: "2rem", display: toggle ? "none" : "block" }}
          >
            {explorer?.items?.map((exp) => (
              <FileExplorer
                key={exp.id}
                explorer={exp}
                setExplorer={setExplorer}
              />
            ))}
          </div>
        </>
      ) : (
        <span>📄{explorer.name}</span>
      )}
    </div>
  );
};

export default FileExplorer;
