import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

const errorAlert = (message) => {
  return MySwal.fire({
      title: "Error!",
      text: message,
      icon: "error",
      confirmButtonText: "Ok"
  });
};

const successAlert = (message) => {
  return MySwal.fire({
    position: "center",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500
  });
};

export const SweetAlerts = {
    errorAlert,
    successAlert,
}
