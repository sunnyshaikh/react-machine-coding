import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextType {
  enqueueToast: (message: string, options?: ToastOptions) => void;
  closeToast: (id: number) => void;
}

interface ToastOptions {
  variant?: "error" | "success" | "warning" | "info";
  duration?: number;
}

interface ToastType {
  id: number;
  message: string;
  isHiding: boolean;
  options?: ToastOptions;
}

interface ToastPropsType {
  maxToast?: number;
  duration?: number;
}

const ToastContext = createContext<ContextType>({
  enqueueToast: () => {},
  closeToast: () => {},
});

const ToastcontextProvider: FC<PropsWithChildren<ToastPropsType>> = ({
  maxToast = 3,
  duration = 3000,
  children,
}) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const enqueueToast = useCallback(
    (msg: string, options?: ToastOptions) => {
      if (toasts.length >= maxToast) return;
      const obj: ToastType = {
        id: Date.now(),
        message: msg,
        isHiding: false,
        options: { variant: "info", duration: 3000, ...options },
      };
      setToasts((prev) => [...prev, obj]);

      setTimeout(() => {
        setToasts((prev) =>
          prev.map((toast) =>
            toast.id === obj.id ? { ...toast, isHiding: true } : toast
          )
        );
        // closeToast(obj.id);
      }, obj.options?.duration ?? duration);
    },
    [maxToast, duration]
  );

  const closeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    let timer: number | undefined;
    const toast = toasts.find((t) => t.isHiding);
    if (toast) timer = setTimeout(() => closeToast(toast.id), 1000);

    return () => clearTimeout(timer);
  }, [toasts]);

  console.log("toasts", toasts);

  return (
    <ToastContext.Provider value={{ enqueueToast, closeToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast ${toast.options?.variant} ${
              toast.isHiding ? "hide" : ""
            }`}
          >
            <p>{toast.message}</p>
            <button onClick={() => closeToast(toast.id)}>x</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToastify = () => useContext(ToastContext);

export default ToastcontextProvider;
