import { useContext, useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  surveys: [],
  questionTypes: [],
  toast: {
    message: null,
    show: false,
  },
  setCurrentUser: () => {},
  setUserToken: () => {}
});

const tmpSurveys = [
  {
      id: 100,
      title: "TheCodeholic YouTube Channel Content",
      slug: "thecodeholic-youtube-channel-content",
      status: "draft",
      image: "https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400x400.png",
      description: "My name is Zura.<br>I am Web Developer with 9+ years of experience, free educational ",
      created_at: "2022-07-31 12:14:00",
      updated_at: "2022-07-31 12:14:00",
      expire_date: "2022-07-31 12:14:00",
      questions: [
        {
            id: 1,
            type: "select",
            question: "From which country are you?",
            description: null,
            data: {
                options: [
                    {
                        uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea",
                        text: "USA"
                    },
                    {
                        uuid: "201c1ff5-23c9-42f9-bfb5-bbc850536440",
                        text: "Georgia"
                    },
                    {
                        uuid: "b5c09733-a49e-460a-ba8a-526863010729",
                        text: "Germany"
                    },
                    {
                        uuid: "2abf1cee-f5fb-427c-a220-b5d159ad6513",
                        text: "India"
                    },
                    {
                        uuid: "8d14341b-ec2b-4924-9aea-bda6a53b51fc",
                        text: "United Kingdom"
                    }
                ]
            },
        },
        {
            id: 2,
            type: "checkbox",
            question: "Which language videos do you want to see on my channel?",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, animi quibusdam. Doloribus dolorum natus rem tempora delectus eveniet ea maiores nisi aperiam, sunt totam culpa eius ut dicta obcaecati ad.",
            data: {
                options: [
                    {
                        uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea",
                        text: "JavaScript"
                    },
                    {
                        uuid: "201c1ff5-23c9-42f9-bfb5-bbc850536440",
                        text: "PHP"
                    },
                    {
                        uuid: "b5c09733-a49e-460a-ba8a-526863010729",
                        text: "HTML + CSS"
                    },
                    {
                        uuid: "2abf1cee-f5fb-427c-a220-b5d159ad6513",
                        text: "All of the above"
                    },
                    {
                        uuid: "8d14341b-ec2b-4924-9aea-bda6a53b51fc",
                        text: "Everything Zura thinks will be good"
                    }
                ]
            },
        },
        {
            id: 3,
            type: "checkbox",
            question: "Which PHP framework videos do you want to see on my channel?",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, animi quibusdam. Doloribus dolorum natus rem tempora delectus eveniet ea maiores nisi aperiam, sunt totam culpa eius ut dicta obcaecati ad.",
            data: {
                options: [
                    {
                        uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea",
                        text: "Laravel"
                    },
                    {
                        uuid: "201c1ff5-23c9-42f9-bfb5-bbc850536440",
                        text: "Yii2"
                    },
                    {
                        uuid: "b5c09733-a49e-460a-ba8a-526863010729",
                        text: "Codeigniter"
                    },
                    {
                        uuid: "2abf1cee-f5fb-427c-a220-b5d159ad6513",
                        text: "Symfony"
                    }
                ]
            },
        },
        {
            id: 4,
            type: "radio",
            question: "Which Laravel Framework do you love most?",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, animi quibusdam. Doloribus dolorum natus rem tempora delectus eveniet ea maiores nisi aperiam, sunt totam culpa eius ut dicta obcaecati ad.",
            data: {
                options: [
                    {
                        uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea",
                        text: "Laravel 5"
                    },
                    {
                        uuid: "201c1ff5-23c9-42f9-bfb5-bbc850536440",
                        text: "Laravel 6"
                    },
                    {
                        uuid: "b5c09733-a49e-460a-ba8a-526863010729",
                        text: "Laravel 7"
                    },
                    {
                        uuid: "2abf1cee-f5fb-427c-a220-b5d159ad6513",
                        text: "Laravel 8"
                    }
                ]
            },
        },
        {
            id: 5,
            type: "checkbox",
            question: "What type of projects do you want to see on my channel built with Laravel?",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, animi quibusdam. Doloribus dolorum natus rem tempora delectus eveniet ea maiores nisi aperiam, sunt totam culpa eius ut dicta obcaecati ad.",
            data: {
                options: [
                    {
                        uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea",
                        text: "REST API"
                    },
                    {
                        uuid: "201c1ff5-23c9-42f9-bfb5-bbc850536440",
                        text: "E-commerce"
                    },
                    {
                        uuid: "b5c09733-a49e-460a-ba8a-526863010729",
                        text: "Real Estate"
                    },
                    {
                        uuid: "2abf1cee-f5fb-427c-a220-b5d159ad6513",
                        text: "All of the above"
                    }
                ]
            },
        },
        {
            id: 6,
            type: "text",
            question: "What's your favourite YouTube channel?",
            description: null,
            data: {},
        },
        {
            id: 7,
            type: "textarea",
            question: "What's do you think about TheCodeholic channel?",
            description: "Write your honest option. Everything is anonymous.",
            data: {},
        }
    ],
  },
  {
    id: 200,
    title: "Laravel 8",
    slug: "laravel-8",
    status: "active",
    image: "https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400x400.png",
    description: "Laravel is a web application framework with expressive, elegant syntax,",
    created_at: "2022-07-31 12:14:00",
    updated_at: "2022-07-31 12:14:00",
    expire_date: "2022-07-31 12:14:00",
    questions: [],
  },
  {
      id: 300,
      title: "Vue 3",
      slug: "vue-3",
      status: "active",
      image: "https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400x400.png",
      description: "Vue (pronounced /vju:/, like view) is a progressive framework for building us",
      created_at: "2022-07-31 12:14:00",
      updated_at: "2022-07-31 12:14:00",
      expire_date: "2022-07-31 12:14:00",
      questions: [],
  },
  {
      id: 400,
      title: "Tailwind 3",
      slug: "tailwind-3",
      status: "active",
      image: "https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400x400.png",
      description: "A utility-first CSS framework packed with classes like <code>flex</code>,",
      created_at: "2022-07-31 12:14:00",
      updated_at: "2022-07-31 12:14:00",
      expire_date: "2022-07-31 12:14:00",
      questions: [],
  }
];

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
  const [surveys, setSurveys] = useState(tmpSurveys);
  const [questionTypes] = useState(['text', 'select', 'radio', 'checkbox', 'textarea']);
  const [toast, setToast] = useState({ message: '', show: false });

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem('TOKEN', token);
    } else {
      localStorage.removeItem('TOKEN');
    }
    _setUserToken(token);
  }

  const showToast = (message) => {
    setToast({message, show: true})
    setTimeout(() => {
      setToast({message: '', show: false})
    }, 5000)
  }

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        surveys,
        questionTypes,
        toast,
        showToast
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
