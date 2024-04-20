import { PlusCircleIcon } from "@heroicons/react/24/outline";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import axiosClient from "../axios";
import { useEffect, useState } from "react";
import PaginationLinks from "../components/PaginationLinks";
import router from "../router";

export default function Surveys() {
  const [surveys, setSurveys] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  const onDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this survey ?')) {
      axiosClient.delete(`/survey/${id}`)
        .then(() => {
          getSurveys()
        })
    }
  }

  const onPageClick = (link) => {
    getSurveys(link.url);
  }

  const getSurveys = (url) => {
    url = url || '/survey';
    setLoading(true);
    axiosClient.get(url)
      .then(({ data }) => {
        setSurveys(data.data)
        setMeta(data.meta)
        setLoading(false)
      })
  }

  useEffect(() => {
    getSurveys();
  }, []);

  return (
    <PageComponent title="Surveys"
      buttons={(
        <TButton color="green" to="/surveys/create">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Create new
        </TButton>
      )}>

        {loading && (
          <div className="text-center text-lg">
            Loading...
          </div>
        )}

      {!loading && (
        <div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {surveys.map(survey => (
              <SurveyListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick} />
            ))}
          </div>

          <PaginationLinks meta={meta} onPageClick={onPageClick} />
        </div>
      )}
    </PageComponent>
  )
}
