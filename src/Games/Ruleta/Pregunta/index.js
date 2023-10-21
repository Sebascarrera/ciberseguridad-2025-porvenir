import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"

import classNames from 'classnames'

import AnswerModal from './Modal'

import { useNavigate } from "react-router-dom"

import { bumpAnsweredQuestion, resetAnsweredQuestions } from "../Redux"

import Logo from '../../../assets/img/ciberseguridad-logo.png'

import './styles.css'

import Config from "../Config"

const PreguntaScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const slices = useSelector( state => state.ruleta.slices )
    const [selectedQuestion, setSelectedQuestion] = useState(null)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [selectedSlice, setSelectedSlice] = useState(null)
    const questions = useSelector( state => state.ruleta.questions)

    useEffect( () => {
        const slice = searchParams.get("slice")

        if (slice) {
            setSelectedSlice(slices[slice])
        }
        
    }, [searchParams, slices])

    useEffect( () => {
        if (selectedSlice) {
            const random = Math.floor( Math.random() * selectedSlice.questions.length)
            setSelectedQuestion(selectedSlice.questions[random])
        }
    }, [selectedSlice])

    const selectAnswer = (index) => {
        setSelectedAnswerIndex(index)

        setTimeout( () => {

            navigate( questions < Config.questionsPerGame ? -1 : '/ruleta/puntaje')

            if(questions === Config.questionsPerGame) {
                dispatch(resetAnsweredQuestions())
            } else {
                dispatch(bumpAnsweredQuestion())
            }
        }, 5000)
    }

    const enums = ['A', 'B', 'C', 'D', 'E', 'F']

    const answers = selectedQuestion ? selectedQuestion.answers.map( (answer, idx) => {
        return (
          <div
            key={"Answer-"+idx}
            onClick={ () => selectAnswer(idx) }
            className={
              classNames([
                "Answer",
                selectedAnswerIndex !== null && idx === selectedQuestion.correct_answer - 1 ? "RightAnswer" : null,
                selectedAnswerIndex !== null && selectedAnswerIndex === idx && idx !== selectedQuestion.correct_answer - 1 ? "WrongAnswer" : null ]) }>
            <div className="AnswerEnum">
              { enums[idx] + ". " }
            </div>
            <div className="AnswerContent">
              { answer.description }
            </div>
          </div>)
      }) : []


    return (
        <div>
            <header className="container_logo">
                <img src={Logo} alt="Logo" />
            </header>
            <div className="Question">
                { selectedQuestion ? selectedQuestion.description : null }
            </div>

            <div className="Answers">
                { answers }
            </div>
            { selectedQuestion &&
            <AnswerModal
                right={ (selectedAnswerIndex === (selectedQuestion.correct_answer - 1)) }
                open={ selectedAnswerIndex !== null } />
            }
        </div>
    )
}

export default PreguntaScreen
