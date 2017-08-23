// Helper Functions
import firebase from 'APP/fire'

// ----------------------------------
// --- Presentation/Slide Helpers ---
// ----------------------------------
export const getSlideType = (presentationID, slideID) => {
  let slideType
  firebase.database()
    .ref(`presentations/${presentationID}/slides/${slideID}/type`)
    .once('value', snapshot => {
      slideType = snapshot.val()
    })
  return slideType
}

export const getPresentationTitle = presentationID =>
  firebase.database()
    .ref(`presentations/${presentationID}/title`)
    .once('value')
    .then(presTitle => presTitle.val())

export const getSlides = presentationID =>
  firebase.database()
    .ref(`presentations/${presentationID}/slides`)
    .on('value', snapshot => snapshot)

export const getQuillSnippet = (presentationID, slideID) => {
  let snippet
  firebase.database()
    .ref(`presentations/${presentationID}/slides/${slideID}/quillContents`)
    .once('value', snapshot => {
      snippet = snapshot.val()
    })
    .then(() => JSON.parse(snippet))
}

export const getVRDescription = (presentationID, slideID) => {
  let description
  firebase.database()
    .ref(`presentations/${presentationID}/slides/${slideID}/VRContents/description`)
    .once('value', snapshot => {
      description = snapshot.val()
    })
  return description
}

export const slideMetadata = (presentationID, slideID) => {
  const slideData = {}
  if (getSlideType(presentationID, slideID) === 'quill') {
    slideData.type = 'Text'
    const quillSnippet = getQuillSnippet(presentationID, slideID)
    if (quillSnippet && typeof(quillSnippet.ops[0].insert) === 'string') {
      slideData.content = quillSnippet.ops[0].insert.slice(0, 71)
    } else {
      slideData.content = 'Image'
    }
  } else if (getSlideType(presentationID, slideID) === 'quiz') {
    slideData.type = 'Quiz'
    slideData.content = getQuestion(presentationID, slideID)
  } else if (getSlideType(presentationID, slideID) === 'VR') {
    slideData.type = 'VR'
    slideData.content = getVRDescription(presentationID, slideID)
  }
  return slideData
}

// --------------------
// --- Quiz Helpers ---
// --------------------
export const getQuestion = (presentationID, slideID) => {
  let question
  firebase.database()
    .ref(`presentations/${presentationID}/slides/${slideID}/quiz-contents/question`)
    .once('value', snapshot => {
      question = snapshot.val()
    })
  return question
}

export const getAnswers = (presentationID, slideID) => {
  let answers
  firebase.database()
    .ref(`presentations/${presentationID}/slides/${slideID}/quiz-contents/answers`)
    .once('value', snapshot => {
      answers = snapshot.val()
    })
  return answers
}

export const getCorrectAnswers = (presentationID, slideID) => {
  let correctAnswers
  firebase.database()
    .ref(`presentations/${presentationID}/slides/${slideID}/quiz-contents/correctAnswers`)
    .once('value', snapshot => {
      correctAnswers = snapshot.val()
    })
  return correctAnswers
}

export const slideHasQuiz = (presentationID, slideID) => {
  let hasQuiz
  firebase.database()
    .ref(`presentations/${presentationID}/slides/${slideID}/type`)
    .once('value', snapshot => {
      const slideType = snapshot.val()
      hasQuiz = slideType === 'quiz'
    })
  return hasQuiz
}

// construct random quiz data **MAKE SOME**
export const generateRandomQuiz = () => {
  const randomQuizes = [
    {
      question: 'What is the largest city in North America by population?',
      answers: ['New York', 'Mexico City', 'Los Angeles', 'Quebec', 'Chicago', 'Boston']
    },
    {
      question: 'What instrument was crafted to sound like the human voice?',
      answers: ['Oboe', 'Violin', 'Trombone', 'Saxophone', 'Trumpet', 'Guitar']
    },
    {
      question: 'What is the largest city in North America by population?',
      answers: ['New York', 'Mexico City', 'Los Angeles', 'Quebec', 'Chicago', 'Boston']
    },
    {
      question: 'What is the largest city in North America by population?',
      answers: ['New York', 'Mexico City', 'Los Angeles', 'Quebec', 'Chicago', 'Boston']
    },
    {
      question: 'What is the largest city in North America by population?',
      answers: ['New York', 'Mexico City', 'Los Angeles', 'Quebec', 'Chicago', 'Boston']
    },
    {
      question: 'What is the largest city in North America by population?',
      answers: ['New York', 'Mexico City', 'Los Angeles', 'Quebec', 'Chicago', 'Boston']
    },
    {
      question: 'What is the largest city in North America by population?',
      answers: ['New York', 'Mexico City', 'Los Angeles', 'Quebec', 'Chicago', 'Boston']
    },
    {
      question: 'What is the largest city in North America by population?',
      answers: ['New York', 'Mexico City', 'Los Angeles', 'Quebec', 'Chicago', 'Boston']
    },
    {
      question: 'What is the largest city in North America by population?',
      answers: ['New York', 'Mexico City', 'Los Angeles', 'Quebec', 'Chicago', 'Boston']
    },
    {
      question: 'What is the largest city in North America by population?',
      answers: ['New York', 'Mexico City', 'Los Angeles', 'Quebec', 'Chicago', 'Boston']
    }
  ]

  return randomQuizes[Math.floor(Math.random() * 10)]
}
