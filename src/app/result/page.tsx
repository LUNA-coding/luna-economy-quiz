'use client'

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const TOTAL_QUESTIONS = 10;

export default function Result() {
    const router = useRouter();
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [rank, setRank] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        const fetchRank = async () => {
            const name = localStorage.getItem('name');
            const phoneNumber = localStorage.getItem('phoneNumber');
            const score = Number(localStorage.getItem('score'));
            setCorrectAnswers(score);

            const response = await fetch('/api/result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, phoneNumber, score }),
            });

            const data = await response.json();
            setRank(data.rank);
            setTotalResults(data.totalResults);
        };

        fetchRank();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="max-w-[500px] w-full flex flex-col">
                <div className="flex flex-row w-full justify-center py-[40px] gap-[10px]">
                    <Image src="/favicon.svg" width={30} height={30} alt={"luna"} />
                    <h1 className="font-[700] text-[25px]">2024 LUNA 금융상식 Quiz</h1>
                </div>
                <div className="flex flex-col gap-[10px] py-[200px]">
                    <h1 className="font-[600] text-[30px] text-center">
                        {TOTAL_QUESTIONS}문제 중 {correctAnswers}문제를 맞추셨습니다! 🎉
                    </h1>
                    <p className="text-[20px] text-center">
                        현재 {totalResults}명 중 {rank}등!
                    </p>
                </div>
                <button
                    onClick={() => {
                        router.push("/");
                    }}
                    type="button"
                    className="w-full py-[10px] px-[12px] rounded-full mt-[25px] bg-luna-black text-white font-[600]"
                >
                    다시하기
                </button>
            </div>
        </div>
    );
}
