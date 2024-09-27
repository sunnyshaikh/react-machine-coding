import { useState } from "react";

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
}

const FileExplorer = ({ explorer }: IType) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="explorer">
      {explorer.isFolder ? (
        <>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setToggle((prev) => !prev)}
          >
            📁{explorer.name}
          </span>
          <br />
          <div
            style={{ paddingLeft: "2rem", display: toggle ? "none" : "block" }}
          >
            {explorer?.items?.map((exp) => (
              <FileExplorer key={exp.id} explorer={exp} />
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
