'use client'

import Image from "next/image";
import Link from "next/link";
import {useState, useEffect, SetStateAction} from "react";
import {useRouter} from "next/navigation";

const questions = [
    {
        question: "임지훈은 사기꾼이다?",
        answers: ["O", "X"],
        correctAnswer: "O",
    },
    {
        question: "비트코인은 익명성이 보장된다?",
        answers: ["O", "X"],
        correctAnswer: "X",
    },
    {
        question: "블록체인은 중앙화된 시스템이다?",
        answers: ["O", "X"],
        correctAnswer: "X",
    },
    {
        question: "스테이블코인은 가격 변동성이 크다?",
        answers: ["O", "X"],
        correctAnswer: "X",
    },
    {
        question: "NFT는 대체 불가능한 토큰을 의미한다?",
        answers: ["O", "X"],
        correctAnswer: "O",
    },
    {
        question: "메타마스크는 중앙화 거래소이다?",
        answers: ["O", "X"],
        correctAnswer: "X",
    },
    {
        question: "루나는 테라 생태계의 스테이블코인이다?",
        answers: ["O", "X"],
        correctAnswer: "X",
    },
    {
        question: "암호화폐는 실물 자산으로 담보된다?",
        answers: ["O", "X"],
        correctAnswer: "X",
    },
    {
        question: "탈중앙화 금융(DeFi)은 전통 금융 시스템을 대체할 수 있다?",
        answers: ["O", "X", "아직 미지수이다"],
        correctAnswer: "아직 미지수이다",
    },
    {
        question: "샤딩은 블록체인의 확장성을 높이는 기술이다?",
        answers: ["O", "X"],
        correctAnswer: "O",
    },
];

export default function Quiz() {
    const router = useRouter();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (currentQuestion === questions.length) {
            router.push('/result');
        } else if (timeLeft === 0) {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
            setTimeLeft(15);
            setSelectedAnswer(null);
            setIsAnswered(false);
        }
    }, [timeLeft, currentQuestion, router]);

    useEffect(() => {
        if (isAnswered) {
            const timer = setTimeout(() => {
                if (currentQuestion === questions.length - 1) {
                    router.push('/result');
                } else {
                    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
                    setTimeLeft(15);
                    setSelectedAnswer(null);
                    setIsAnswered(false);
                }
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isAnswered, currentQuestion, router]);

    const handleAnswerClick = (answer: any) => {
        setSelectedAnswer(answer);
        setIsAnswered(true);
        setTimeLeft(2);

        if (answer === questions[currentQuestion].correctAnswer) {
            const currentScore = localStorage.getItem('score');
            if (currentScore) {
                const updatedScore = parseInt(currentScore) + 1;
                localStorage.setItem('score', updatedScore.toString());
            } else {
                localStorage.setItem('score', '1');
            }
        }
    };

    const getButtonColor = (answer: string | null) => {
        if (!isAnswered) return 'bg-white';
        if (answer === selectedAnswer) {
            return answer === questions[currentQuestion].correctAnswer ? 'bg-green-200' : 'bg-red-200';
        }
        return answer === questions[currentQuestion].correctAnswer ? 'bg-green-200' : 'bg-white';
    };

    return (
        <div className='flex flex-col items-center'>
            <div className='max-w-[500px] w-full flex flex-col items-center'>
                <div className='flex flex-row w-full justify-center py-[40px] gap-[10px]'>
                    <Image src='/favicon.svg' width={30} height={30} alt={'luna'}/>
                    <h1 className='font-[700] text-[25px]'>2024 LUNA 금융상식 Quiz</h1>
                </div>
                <div className='flex flex-row w-full justify-between py-[20px] px-[60px]'>
                    <div>
                        <h2 className='font-[500] text-[40px]'>Q{currentQuestion + 1}</h2>
                        <Link className='font-[400] text-[15px]' href={'/'}>&lt; 메인을 돌아가기</Link>
                    </div>
                    <div>
                        <p className='font-[400] text-[15px] text-right'>제한시간</p>
                        <h2 className='font-[500] text-[40px] text-right'>{timeLeft}초</h2>
                    </div>
                </div>
                {questions[currentQuestion] && (
                    <>
                        <div className='flex flex-row w-full justify-center py-[60px] px-[20px] gap-[10px]'>
                            <h1 className='font-[500] text-[25px]'>{questions[currentQuestion].question}</h1>
                        </div>
                        <div className='flex flex-col w-[80%] gap-[16px] py-[20px]'>
                            {questions[currentQuestion].answers.map((answer, index) => (
                                <button
                                    key={index}
                                    className={`rounded-[6px] w-full py-[20px] ${getButtonColor(answer)} text-luna-black font-[500] text-[20px] border-[2px] border-[#c0c0dc60]`}
                                    onClick={() => handleAnswerClick(answer)}
                                    disabled={isAnswered}
                                >
                                    {answer}
                                </button>
                            ))}
                        </div>
                    </>
                )}
                <div className='w-full flex flex-col justify-center items-center py-[60px] px-[40px] gap-[10px]'>
                    <div className='bg-[#c0c0dc60] rounded-[10px] w-[80%] h-[10px]'>
                        <div
                            className='bg-luna-dark rounded-[10px] h-[10px] transition-width duration-500'
                            style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
                        />
                    </div>
                    <p>{currentQuestion + 1} / {questions.length}</p>
                </div>
            </div>
        </div>
    );
}
