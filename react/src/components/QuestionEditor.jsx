import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";

export default function QuestionEditor({
  index = 0,
  question,
  addQuestion,
  deleteQuestion,
  questionChange,
}) {
  const [model, setModel] = useState({ ...question });
  const { questionTypes } = useStateContext();

  useEffect(() => {
    questionChange(model);
  }, [model]);

  function upperCaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function shouldHaveOptions(type = null) {
    type = type || model.type;
    return ['select', 'radio', 'checkbox'].includes(type);
  }

  function onTypeChange(ev) {
    const newModel = {
      ...model,
      type: ev.target.value
    }
    if (!shouldHaveOptions(model.type) && shouldHaveOptions(ev.target.value)) {
      if (!model.data.options) {
        newModel.data = {
          options: [
            { uuid: uuidv4(), text: '' }
          ],
        }
      }
    }
    setModel(newModel);
  }

  function addOption() {
    model.data.options.push({
      uuid: uuidv4(),
      text: ''
    })
    setModel({ ...model })
  }

  function deleteOption(op) {
    model.data.options = model.data.options.filter(option => option.uuid != op.uuid)
    setModel({ ...model })
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-bold">
            {index + 1}. {model.question}
          </h4>
          <div className="flex items-center">
            <button
              type="button"
              className="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
              onClick={() => addQuestion(index + 1)}
            >
              <PlusIcon className="w-4" />
              Add
            </button>

            <button
              type="button"
              className="flex items-center text-xs py-1 px-3 rounded-sm border border-transparent text-red-500 hover:border-red-600"
              onClick={() => deleteQuestion(question)}
            >
              <TrashIcon className="w-4" />
              Delete
            </button>
          </div>
        </div>

        <div className="grid gap-3 grid-cols-12">
          {/* Question Text */}
            <div className="mt-3 col-span-9">
              <label
                htmlFor="question"
                className="block text-sm font-medium text-gray-700"
              >
                Question Text
              </label>
              <input
                type="text"
                name="question"
                id="question"
                value={model.question}
                onChange={(ev) => setModel({ ...model, question: ev.target.value })}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          {/* Question Text */}

          {/* Question Type */}
            <div className="mt-3 col-span-3">
              <label
                htmlFor="questionType"
                className="block text-sm font-medium text-gray-700"
              >
                Select Question Type
              </label>
              <select
                id="questionType"
                name="questionType"
                onChange={onTypeChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {questionTypes.map((type) => (
                  <option value={type} key={type}>
                    {upperCaseFirst(type)}
                  </option>
                ))}
              </select>
            </div>
          {/* Question Type */}

          {/* Description */}
          <div className="mt-3 mb-3 col-span-12">
              <label
                htmlFor="questionDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="questionDescription"
                id="questionDescription"
                value={model.description || ''}
                onChange={(ev) =>
                  setModel({ ...model, description: ev.target.value })
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
              ></textarea>
            </div>
          {/* Description */}

          <div className="mt-3 mb-3 col-span-12">{shouldHaveOptions() && (<div>
            <h4 className="text-sm font-semibold mb-1 flex justify-between items-center">
              Options

              <button
                onClick={addOption}
                type="button"
                className="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
              >
                Add
              </button>
            </h4>

            {model.data.options.length === 0 && (
              <div  className="text-xs text-gray-600 text-center py-3">
                You don't have any options defined
              </div>
            )}

            {model.data.options.length > 0 && (<div>
              {model.data.options.map((op, ind) => (
                <div key={op.uuid} className="flex items-center mb-1">
                  <span className="w-6 text-sm">{ind + 1}.</span>
                  <input type="text" value={op.text} onInput={ev => { op.text = ev.target.value; setModel({ ...model }) }} className="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500" />
                  <button onClick={ev => deleteOption(op)} type="button" className="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100">
                    <TrashIcon className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              ))}
            </div>)}
          </div>)}
          </div>

          {model.type === "select" && (<div></div>)}
        </div>
      </div>
      <hr />
    </>
  )
}
