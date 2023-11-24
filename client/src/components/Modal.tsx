interface IModal {
  inputText: string;
  setInputText: (input: string) => void;
  setPopupToggle: (popupToggle: boolean) => void;
  actionHandler: () => Promise<void>
  action: string
}
const Modal = (props: IModal) => {
  const { inputText, action, setInputText, setPopupToggle, actionHandler } = props;
  return (
    <div
      tabIndex={-1}
      className="flex bg-black bg-opacity-30 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              {action} task
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={() => setPopupToggle(false)}
            >
              x
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Type Title
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="write a task title ..."
                  onChange={(e) => setInputText(e.target.value)}
                  value={inputText}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={actionHandler}
              >
                {action} Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
