'use client'

import Image from "next/image";
import {FormEvent, useState} from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const [contact, setContact] = useState<[string, boolean]>(["", false]);

    const formatPhoneNumber = (number: string): [string, boolean] => {
        const cleaned = ("" + number).replace(/\D/g, "");
        const match1 = cleaned.match(/^(\d{3})(\d)$/) || cleaned.match(/^(\d{3})(\d{2})$/) || cleaned.match(/^(\d{3})(\d{3})$/) || cleaned.match(/^(\d{3})(\d{4})$/);
        if (match1) {
            return [match1[1] + "-" + match1[2], false];
        }
        const match2 = cleaned.match(/^(\d{3})(\d{4})(\d)$/) || cleaned.match(/^(\d{3})(\d{4})(\d{2})$/) || cleaned.match(/^(\d{3})(\d{4})(\d{3})$/);
        if (match2) {
            return [match2[1] + "-" + match2[2] + "-" + match2[3], false];
        }
        const match3 = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
        if (match3) {
            return [match3[1] + "-" + match3[2] + "-" + match3[3], true];
        }
        const newCleaned = cleaned.slice(0, 11);
        const match4 = newCleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
        if (!match4) {
            return [cleaned, false];
        }
        return [match4[1] + "-" + match4[2] + "-" + match4[3], true];
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        const nameInput = form.elements.namedItem("name") as HTMLInputElement;
        const phoneNumberInput = form.elements.namedItem("phoneNumber") as HTMLInputElement;

        const name = nameInput ? nameInput.value : "null";
        const phoneNumber = phoneNumberInput ? phoneNumberInput.value : "null";

        if (!phoneNumber) {
            const yes = confirm("전화번호를 입력하지 않으면 기프티콘 수령을 할 수 없어요. 🫨\n계속 진행하시겠어요?");
            if (!yes) return;
        }

        localStorage.setItem('name', name);
        localStorage.setItem('phoneNumber', phoneNumber || 'null');
        localStorage.setItem('score', '0');

        router.push('/quiz');
    };

    return (
        <div className='flex flex-col items-center'>
            <div className='max-w-[500px] w-full flex flex-col'>
                <div className='flex flex-row w-full justify-center py-[40px] gap-[10px]'>
                    <Image src='/favicon.svg' width={30} height={30} alt={'luna'}/>
                    <h1 className='font-[700] text-[25px]'>2024 LUNA 금융상식 Quiz</h1>
                </div>
                <iframe
                    width="496"
                    height="281"
                    src="https://www.youtube.com/embed/I3ayrjL-lPg?autoplay=1&loop=1&controls=0&modestbranding=0&playlist=I3ayrjL-lPg"
                    title="2022 LUNA🌙 홍보영상"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className='rounded-[5px] border-[2px] border-[#c0c0dc60]'
                />
                <div className='flex flex-col items-center py-[40px]'>
                    <h1 className='text-[25px] font-[600]'>여러분의 금융상식을 퀴즈로 알아봐요!</h1>
                    <p className='text-[16px]'>상품 증정을 위하여 이름과 전화번호를 입력해 주세요!</p>
                </div>
                <div className='flex flex-col items-center'>
                    <form
                        className='flex flex-col gap-[5px] w-[85%]'
                        onSubmit={handleSubmit}
                    >
                        <input
                            placeholder="이름"
                            className='w-full py-[10px] px-[12px] rounded-[5px] border-[1px] border-[#c0c0dc60] outline-none'
                            type="text"
                            name="name"
                            required
                        />
                        <input
                            placeholder="전화번호(선택)"
                            className='w-full py-[10px] px-[12px] rounded-[5px] border-[1px] border-[#c0c0dc60] outline-none'
                            type="tel"
                            value={contact[0]}
                            onChange={(e) => {
                                setContact(formatPhoneNumber(e.target.value));
                            }}
                            name="phoneNumber"
                        />
                        <button
                            type="submit"
                            className='w-full py-[10px] px-[12px] rounded-full mt-[25px] bg-luna-black text-white font-[600]'
                        >
                            시작하기
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
