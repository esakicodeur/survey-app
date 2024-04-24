import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import PublicQuestionView from "../components/PublicQuestionView";
import admin from '../adminResults';

export default function SurveyPublicView() {
  const results = [];
  const finalResults = [];

  const [adminResults, setAdminResults] = useState(admin);
  const [data, setData] = useState([]);

  const studentResults = {};

  const [surveyFinished, setSurveyFinished] = useState(false);
  const [survey, setSurvey] = useState({
    questions: []
  });
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true)
    axiosClient.get(`survey/get-by-slug/${slug}`).then(({ data }) => {
      setLoading(false);
      setSurvey(data.data);
    }).catch(() => {
      setLoading(false);
    })
  }, []);

  function answerChanged(question, value) {
    studentResults[question.question] = value;
  }

  function onSubmit(ev) {
    ev.preventDefault();

    adminResults.forEach((element) => {
      if (Object.keys(element)[0] == survey.slug) {
        for (const cle in element[survey.slug]) {
          if (cle in studentResults) {
            for (const key in studentResults) {
              if (key === cle) {
                if (studentResults[key] === element[survey.slug][cle]) {
                  finalResults[key] = `[ ${key} ] ---> ( ${studentResults[key]} ) ---> vrai`;
                } else {
                  finalResults[key] = `[ ${key} ] ---> ( ${studentResults[key]} ) ---> faux`;
                }
              }
            }
          } else {
            finalResults[cle] = `[ ${cle} ] ---> Pas de reponse !`;
          }
        }
      }
    });

    setData(finalResults);

    setSurveyFinished(true);
  }

  return (
    <div>
      {loading && (<div className="flex justify-center">Loading...</div>)}
      {!loading && (
        <form onSubmit={ev => onSubmit(ev)} className="container mx-auto p-4">
          <div className="items-center">
            <div className="w-[600px] mx-auto">
              <h1 className="text-3xl mb-3">{survey.title}</h1>
              <h1 className="text-3xl mb-3">{survey.slug}</h1>
              <p className="text-gray-500 text-sm mb-3">Expire Date : {survey.expire_date}</p>
              <p className="text-gray-500 text-sm mb-3">{survey.description}</p>
            </div>
            <div className="w-[600px] mx-auto">
              <img src={ survey.image_url } alt="" />
            </div>
          </div>

          {surveyFinished && (
            <div className="w-[600px] mx-auto py-8 px-6 bg-gray-100 text-white">
              {/* Thank you for participating in the survey */}
              <div className="grid grid-cols-12">
                {data.map((item, index) => {
                    return (
                      <div key={index} className="my-3 col-span-12 bg-gray-700 p-2 ml-5 rounded-md">
                        {item}
                      </div>
                    )
                  }
                )}
              </div>
            </div>
          )}

          {!surveyFinished && (
            <>
              <div>
                {survey.questions.map((question, index) => (
                  <PublicQuestionView
                    key={question.id}
                    question={question}
                    index={index}
                    answerChanged={val => answerChanged(question, val)}
                  />
                ))}
              </div>

              <div className="w-[600px] mx-auto justify-center">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>

            </>
            )}
          </form>
      )}
    </div>
  )
}
