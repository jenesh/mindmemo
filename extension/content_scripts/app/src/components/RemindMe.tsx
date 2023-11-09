import React from "react";
import styled from "styled-components";
import DatePicker, { CalendarContainer } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { sharedInputStyles } from "./MemoDetails";

const MemoWrapper = styled.div`
    margin-top: 16px;
`;

const SectionTitle = styled.p`
    &&& {
        font-family: Inter,sans-serif;
    }
    font-size: 14px;
    color: #3B3B3B;
    margin-bottom: 14px;
`;

const InputContainer = styled.div`
    margin-bottom: 8px;
    height: 48px;
    display: flex;
`;

const DaysRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0;
    margin-bottom: 16px;
    height: 34px;
`;

interface DayButtonProps {
    isSelected: boolean;
}

const DayButton = styled.button<DayButtonProps>`
    font-size: 14px;
    color: #3B3B3B;
    padding: 8px 12px;
    border-radius: 16px;
    border: 1px solid #B4B4B4;
    box-sizing: border-box;
    background: ${(props) => props.isSelected ? "#FFFFFF" : "#F1F1F1"};
    border-color: ${(props) => props.isSelected ? "#5C73BC" : "#B4B4B4"};

    &:hover {
        border: 1px solid #3B3B3B;
        cursor: pointer;
    }

    &:focus {
        border-color: #5C73BC;
    }

    &:active {
        border-color: #5C73BC;
    }
`;

const StyledDatePicker = styled(DatePicker)`
    background: #FFFFFF;
    color: #000;
    border-radius: 8px;
    border: 2px solid #3B3B3B;
    margin-top: 4px;
    box-sizing: border-box;
    padding: 12px 16px;
`;

const CalendarInput = styled.input`
    ${sharedInputStyles}
    width: 240px;
    height: 48px;
    background: #FFFFFF;
`;

const CalendarLabel = styled.label`
    &&& {
        font-family: Inter,sans-serif;
    }
    position: absolute;
    font-size: 12px;
    color: #3B3B3B;
    top: 247px;
    left: 34px;
    background: #FFFFFF;
    padding: 0 4px;
    height: fit-content;
`;

const CalendarContainerWrapper = styled(CalendarContainer)`
    background: #FFFFFF;
`;

interface RemindMeProps {
    startDate: Date;
    setStartDate: (date: Date) => void;
    handleTodayClick?: () => void;
    handleTomorrowClick?: () => void;
    handleTowDaysAfterClick?: () => void;
    currentSelectedOption: number;
}

const icon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 48 48"
    >
        <mask id="ipSApplication0">
            <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                <path
                    fill="#fff"
                    d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                ></path>
            </g>
        </mask>
        <path
            fill="currentColor"
            d="M0 0h48v48H0z"
            mask="url(#ipSApplication0)"
        ></path>
    </svg >
)

const RemindMe: React.FC<RemindMeProps> = ({
    startDate,
    setStartDate,
    handleTodayClick,
    handleTomorrowClick,
    handleTowDaysAfterClick,
    currentSelectedOption
}) => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;

    const CalendarCustomContainer = ({ className, children }) => {
        return (
            <CalendarContainerWrapper className={className}>
                {children}
            </CalendarContainerWrapper>
        );
    }

    const selectedOption = (option: number) => {
        if (option === currentSelectedOption) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <MemoWrapper>
            <SectionTitle>Remind me</SectionTitle>
            <DaysRow>
                <DayButton onClick={handleTodayClick} isSelected={selectedOption(1)}>Today</DayButton>
                <DayButton onClick={handleTomorrowClick} isSelected={selectedOption(2)}> Tomorrow</DayButton>
                <DayButton onClick={handleTowDaysAfterClick} isSelected={selectedOption(3)}> 2 days</DayButton>
            </DaysRow >

            <StyledDatePicker
                showIcon={false}
                selected={startDate}
                onChange={(date: Date) => {
                    console.log(`Start date: `, date)
                    setStartDate(date)
                }}
                icon={icon}
                customInput={<CalendarInput />}
                calendarContainer={CalendarCustomContainer}
                dateFormat="MM/dd/yyyy"
            />
            <CalendarLabel htmlFor="date">Date</CalendarLabel>

            {/* {value.startDate === null && error && (
                <div className="font-Inter text-[12px] text-red-500 text-sm pl-4">Date required</div>
            )} */}
        </MemoWrapper >
    );
}

export default RemindMe;