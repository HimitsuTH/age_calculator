import React, { useState } from 'react'

import icon_arrow from '../../public/images/icon-arrow.svg';

type Props = {}

const Content = (props: Props) => {

    //set Value on input
    const [day, setDay] = useState<string>("")
    const [month, setMonth] = useState<string>("")
    const [year, setYear] = useState<string>("")


    //output
    const [outputDay, setOutputDay] = useState<string>("")
    const [outputMonth, setOutputMonth] = useState<string>("")
    const [outputYear, setOutputYear] = useState<string>("")



    //error Message && active
    const [error, setError] = useState<boolean>(false);
    const [errorDay, setErrorDay] = useState<string>("")
    const [errorMonth, setErrorMonth] = useState<string>("")
    const [errorYear, setErrorYear] = useState<string>("")



    const y = parseInt(year);
    const m = parseInt(month);
    let d = parseInt(day);
    //set days of months
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    // const maxDay = new Date(y, m, 0).getDate();

    //current year
    const currendDate = new Date();
    let currentYear = currendDate.getFullYear();
    let currentMonth = currendDate.getMonth() + 1;
    let currentDay = currendDate.getDay();




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (y && m && d) {
            const _validate = await validate(y, m, d)
            setError(_validate);
            if (!_validate) {
                //set default error message;
                setErrorYear("")
                setErrorMonth("")
                setErrorDay("")


                //set output
                if(m > currentMonth) {
                    currentMonth = currentMonth + 12;
                    currentYear = currentYear - 1;
                }
                setOutputYear(`${currentYear - y}`);
                setOutputMonth(`${currentMonth - m}`);
                if (d > currentDay) {

                    currentDay = currentDay + months[m-1];

                }
                setOutputDay(`${currentDay - d}`);
            }
        } else {
            if (!y) {
                setErrorYear("Must be a valid year.")
            } else {
                setErrorYear("")
            }
            if (!m) {

                setErrorMonth("Must be a valid month.")
            } else {
                setErrorMonth("")
            }
            if (!d) {

                setErrorDay("Must be a valid day.")
            } else {

                setErrorDay("")
            }
            setOutputYear("");
            setOutputMonth("");
            setOutputDay("");
            setError(true);
        }



    }
    const validate = (y: number, m: number, d: number): boolean => {
        let check = false;
        if (y < 1 || y > currentYear) {
            setErrorYear("Must be a valid year.")
            check = true;
        }
        if (m < 1 || m > 12) {
            setErrorMonth("Must be a valid month.")
            check = true;
        }
        if (d < 1 || d > months[m - 1] || months[m - 1] == undefined) {
            setErrorDay("Must be a valid day.")
            check = true;
        }

        return check
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label>Day<input placeholder='DD' className={`input ${error && "active"}`} type='number'
                        value={day} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDay(e.target.value)} />
                        {<p>{errorDay ? errorDay : " "}</p>}
                    </label>
                    <label>Month<input placeholder='MM' className={`input ${error && "active"}`} type='number'
                        value={month} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonth(e.target.value)} />
                        {<p>{errorMonth ? errorMonth : " "}</p>}
                    </label>
                    <label>Year<input placeholder='YY' className={`input ${error && "active"}`} type='number'
                        value={year} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYear(e.target.value)} />
                        {<p>{errorYear ? errorYear : " "}</p>}
                    </label>
                </div>
                <div className='btn-container'>
                    <button className='btn' type='submit'>
                        <img src={icon_arrow} alt="arrow" />
                    </button>
                </div>

            </form>


            <div className='output-container'>
                <p className='output'>
                    <span>{outputYear ? outputYear : "--"}</span> years
                </p>
                <p className='output'>
                    <span>{outputMonth ? outputMonth : "--"}</span> months
                </p>
                <p className='output'>
                    <span>{outputDay ? outputDay : "--"}</span> days
                </p>
            </div>
        </section>
    )
}

export default Content