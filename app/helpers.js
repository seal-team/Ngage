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

export const getPresentationTitle = presentationID => {
  let slideTitle
  firebase.database()
    .ref(`presentations/${presentationID}/title`)
    .once('value', snapshot => {
      slideTitle = snapshot.val()
    })
  return slideTitle
}

export const getSlides = presentationID => {
  let slides
  firebase.database()
    .ref(`presentations/${presentationID}/slides`)
    .on('value', snapshot => {
      slides = snapshot.val()
    })
  return slides
}

export const getQuillSnippet = (presentationID, slideID) => {
  let snippet
  firebase.database()
    .ref(`presentations/${presentationID}/slides/${slideID}/quillContents`)
    .once('value', snapshot => {
      snippet = snapshot.val()
    })
  return JSON.parse(snippet)
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
