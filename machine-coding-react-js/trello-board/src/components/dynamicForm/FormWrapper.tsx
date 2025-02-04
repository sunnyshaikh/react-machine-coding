import { FC } from "react";
import { FaPlus } from "react-icons/fa";

interface FormWrapperType {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancel: VoidFunction;
  inputValue: string;
  submitButtonTitle?: string;
  cancelButtonTitle?: string;
}

const FormWrapper: FC<FormWrapperType> = ({
  handleSubmit,
  handleChange,
  handleCancel,
  inputValue,
  submitButtonTitle = "Add",
  cancelButtonTitle = "Cancel",
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 p-3 rounded shadow-md min-w-[280px] flex flex-col gap-3"
    >
      <div className="form-group w-full">
        <input
          type="text"
          className="w-full bg-slate-600 p-1 rounded"
          autoFocus
          value={inputValue}
          onChange={handleChange}
          required
        />
      </div>
      <div className="cta flex gap-2">
        <button className="bg-indigo-500 rounded flex items-center justify-center gap-2 p-1 flex-1">
          <FaPlus />
          {submitButtonTitle}
        </button>
        <button
          type="button"
          className="bg-red-500 rounded flex items-center justify-center gap-2 py-1 px-2"
          onClick={() => handleCancel()}
        >
          <FaPlus className="rotate-45" />
          {cancelButtonTitle}
        </button>
      </div>
    </form>
  );
};

export default FormWrapper;
