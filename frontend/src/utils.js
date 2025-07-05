import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
  toast.success(msg || "Success!", {
    position: "top-right",
    autoClose: 1500,
  });
};

export const handleError = (msg) => {
  toast.error(msg || "Something went wrong", {
    position: "top-right",
    autoClose: 2000,
  });
};
