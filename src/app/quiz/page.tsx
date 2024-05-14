'use client'

import Image from "next/image";
import Link from "next/link";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

const questions = [
    {
        question: "투자는 원금 보장이 되므로 손실 위험이 없어요.",
        answers: ["O", "X"],
        correctAnswer: "X",
        explanation: "투자는 수익을 기대할 수 있지만, 원금 손실의 위험도 항상 존재해요."
    },
    {
        question: "분산 투자는 위험을 줄이는 투자 전략 중 하나예요.",
        answers: ["O", "X"],
        correctAnswer: "O",
        explanation: "한 가지 상품에만 투자하는 것보다, 여러 상품에 분산 투자하면 위험을 줄일 수 있어요."
    },
    {
        question: "단리는 이자에 대한 이자가 발생하는 계산 방식이에요.",
        answers: ["O", "X"],
        correctAnswer: "X",
        explanation: "단리는 원금에 대해서만 이자를 계산하는 방식이에요. 이자에 대한 이자가 발생하는 것은 복리예요."
    },
    {
        question: "집을 담보로 빌리는 대출을 무엇이라고 할까요?",
        answers: ["신용대출", "주택담보대출", "마이너스통장", "한도대출"],
        correctAnswer: "주택담보대출",
        explanation: "주택담보대출은 집을 담보로 제공하고 은행에서 돈을 빌리는 대출 상품이에요."
    },
    {
        question: "투자자가 기업에 자금을 대여하고 이자를 받는 금융상품은?",
        answers: ["주식", "채권", "펀드", "예금"],
        correctAnswer: "채권",
        explanation: "채권은 투자자가 기업이나 정부에 자금을 빌려주고 이자를 받는 금융상품입니다."
    },
    {
        question: "금융상품 중 위험과 수익이 가장 낮은 것은?",
        answers: ["주식형 펀드", "채권형 펀드", "예금", "적금"],
        correctAnswer: "예금",
        explanation: "예금은 위험과 수익이 다른 금융상품에 비해 가장 낮아요."
    },
    {
        question: "디플레이션이 발생하면 화폐 가치가 떨어지고 물가가 하락해요.",
        answers: ["O", "X"],
        correctAnswer: "X",
        explanation: "디플레이션은 화폐 가치 상승과 물가 하락을 동반해요."
    },
    {
        question: "환헤지는 환율 변동 위험을 높이기 위한 전략이에요.",
        answers: ["O", "X"],
        correctAnswer: "X",
        explanation: "환헤지는 환율 변동으로 인한 손실을 방지하거나 최소화하는 전략이에요."
    },
    {
        question: "한 번에 큰 금액을 투자하는 방법을 무엇이라고 할까요?",
        answers: ["일시납", "적립식", "거치식", "수시입출금"],
        correctAnswer: "일시납",
        explanation: "일시납은 한 번에 큰 금액을 투자하는 방식이에요."
    },
    {
        question: "다음 중 단기 투자에 가장 적합한 금융상품은?",
        answers: ["주식", "채권", "예금", "적금"],
        correctAnswer: "예금",
        explanation: "단기적으로는 예금이 안정적이고 유동성이 높아 적합해요."
    },
    {
        question: "자산 배분 전략에서 공격적인 투자자의 주식 비중은 일반적으로 어느 정도일까요?",
        answers: ["30% 이하", "30% ~ 50%", "50% ~ 70%", "70% 이상"],
        correctAnswer: "70% 이상",
        explanation: "공격적인 투자자는 수익을 극대화하기 위해 주식 비중을 70% 이상으로 높게 가져가는 경향이 있어요."
    },
    {
        question: "다음 중 포트폴리오의 위험을 측정하는 지표는?",
        answers: ["표준편차", "샤프 지수", "알파", "베타"],
        correctAnswer: "표준편차",
        explanation: "포트폴리오의 위험을 측정하는 대표적인 지표는 표준편차예요."
    },
    {
        question: "금리와 채권 가격의 관계는 어떻게 되나요?",
        answers: ["반비례 관계", "비례 관계", "관계없음", "일정하지 않음"],
        correctAnswer: "반비례 관계",
        explanation: "금리가 오르면 채권 가격은 내려가고, 금리가 내려가면 채권 가격은 올라가요."
    },
    {
        question: "다음 중 파생상품이 아닌 것은?",
        answers: ["선물", "옵션", "스왑", "채권"],
        correctAnswer: "채권",
        explanation: "채권은 파생상품이 아니라 기초자산 중 하나예요."
    },
    {
        question: "무위험 수익률보다 높은 수익률을 추구하기 위해 감수해야 하는 위험을 무엇이라고 할까요?",
        answers: ["시장 위험", "신용 위험", "유동성 위험", "인플레이션 위험"],
        correctAnswer: "시장 위험",
        explanation: "무위험 수익률보다 높은 수익률을 추구하려면 시장 위험을 감수해야 해요."
    }
];

export default function Quiz() {
    const router = useRouter();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

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
            setShowExplanation(false);
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
                    setShowExplanation(false);
                }
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isAnswered, currentQuestion, router]);

    const handleAnswerClick = (answer: any) => {
        setSelectedAnswer(answer);
        setIsAnswered(true);
        setTimeLeft(2);
        setShowExplanation(true);

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
                        <Link className='font-[400] text-[15px]' href={'/'}>&lt; 메인으로 돌아가기</Link>
                    </div>
                    <div>
                        <p className='font-[400] text-[15px] text-right'>제한시간</p>
                        <h2 className='font-[500] text-[40px] text-right'>{timeLeft}초</h2>
                    </div>
                </div>
                {questions[currentQuestion] && (
                    <>
                        <div className='flex flex-row w-full justify-center py-[60px] px-[20px] gap-[10px]'>
                            <h1 className='font-[500] text-[25px] text-center'>{questions[currentQuestion].question}</h1>
                        </div>
                        <div className='flex flex-col w-[80%] gap-[16px] py-[20px]'>
                            {questions[currentQuestion].answers.map((answer, index) => (
                                <button
                                    key={index}
                                    className={`rounded-[6px] w-full py-[20px] ${getButtonColor(answer)} text-luna-black font-[500] text-[20px] text-center border-[2px] border-[#c0c0dc60]`}
                                    onClick={() => handleAnswerClick(answer)}
                                    disabled={isAnswered}
                                >
                                    {answer}
                                </button>
                            ))}
                        </div>
                        {showExplanation && (
                            <div className='flex flex-col w-[80%] py-[20px]'>
                                <p className='font-[400] text-[18px] text-center'>{questions[currentQuestion].explanation}</p>
                            </div>
                        )}
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
