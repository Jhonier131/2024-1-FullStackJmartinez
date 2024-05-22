/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function MyModal(props) {
  console.log("props");
  console.log(props);
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        {props.data ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                  <img className="h-6 w-6 text-gray-500 dark:text-gray-400" src="src\assets\avion.png" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Ticket Vuelo</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Fecha: {props.data.fecha}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Equipaje</p>
                <p className="text-gray-900 dark:text-gray-100 font-medium">{props.data.maleta}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Origen</p>
                <p className="text-gray-900 dark:text-gray-100 font-medium">{props.data.origen}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Destino</p>
                <p className="text-gray-900 dark:text-gray-100 font-medium">{props.data.destino}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <p>Ya tienes un vuelo a este lugar.</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
