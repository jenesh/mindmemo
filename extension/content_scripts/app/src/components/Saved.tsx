import React from "react";
import styled from "styled-components";

const SavedWrapper = styled.div`
    width: 288px;
    background: #F1F1F1;
    border-radius: 8px;
`;

const TitleWrapper = styled.div`
    padding: 8px 12px 16px 8px;
    width: 288px;
    height: 56px;
    background: #90DFAA;
    border-radius: 8px 8px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TitleWithCheck = styled.div`
    display: flex;
    align-items: center;
`;

const CloseSvg = styled.svg`
    cursor: pointer;
    transition: all 0.5s;
    transform-origin: 50% 50%;
    &:hover {
        opacity: 0.7;
        transform: scale(1.2);
    }
`;

const MemoDetailsWrapper = styled.div`
    background: #FFFFFF;
    border-radius: 8px;
    height: fit-content;
    margin: 8px;
    position: relative;
    top: -20px;
    padding: 12px;
`;

const SectionTitle = styled.p`
    &&& {
        font-family: Inter,sans-serif;
    }
    font-size: 18px;
`;

const MemoTitle = styled.a`
    &&& {
        font-family: Inter,sans-serif;
    }
    font-weight: 800;
    text-decoration: underline;
`;

const DateRow = styled.div`
    display: flex;
    align-items: center;
    margin: 12px 0;
`;

const FormattedDate = styled.p`
    &&& {
        font-family: Inter,sans-serif;
    }
    margin-left: 12px;
`;

const MemoUrl = styled.p`
    &&& {
        font-family: Inter,sans-serif;
    }
    color: #3B3B3B;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const MemoNotes = styled.p`
    &&& {
        font-family: Inter,sans-serif;
    }
    color: #3B3B3B;
    font-size: 16px;
    italic: true;
    margin-top: 12px;
`;

const HorizontalLine = styled.hr`
    width: 250px;
    height: 2px;
    border-radius: 100px;
    background: #D9D9D9;
    margin: 12px 0;
`;

const formatDateToCustomString = (date: Date) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = daysOfWeek[date.getDay()];
    const dayOfMonth = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}, ${dayOfMonth} ${month} ${year}`;
}


interface SavedProps {
    handleMouseDown: (e: React.MouseEvent) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title: string;
    url: string;
    startDate: Date;
    notes: string;
}

const Saved: React.FC<SavedProps> = ({ handleMouseDown, isOpen, setIsOpen, title, url, startDate, notes }) => {
    const formattedDate = formatDateToCustomString(startDate);
    return (
        <SavedWrapper>
            <TitleWrapper onMouseDown={handleMouseDown}>
                <TitleWithCheck>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14 0C-4.66465 0.586 -4.66869 27.412 14 28C32.6646 27.414 32.6687 0.588 14 0Z"
                            fill="#90DFAA"
                        />
                        <path
                            d="M21.7765 9.86108L11.9971 19.5531C11.8079 19.7405 11.5513 19.8459 11.2838 19.8459C11.0162 19.8459 10.7596 19.7405 10.5704 19.5531L6.22359 15.2451C5.28521 14.3421 6.73818 12.9001 7.65033 13.8311L11.2828 17.4311L20.3497 8.44707C21.2619 7.51707 22.7158 8.95708 21.7765 9.86108Z"
                            fill="#3B3B3B"
                            dataTime
                        />
                    </svg>
                    <SectionTitle>MindMemo saved.</SectionTitle>
                </TitleWithCheck>
                <CloseSvg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={(e) => setIsOpen(!isOpen)}
                >
                    <path
                        d="M7.05673 5.99936L11.7783 1.28477C11.9194 1.14363 11.9987 0.952206 11.9987 0.752604C11.9987 0.553001 11.9194 0.361573 11.7783 0.220433C11.6372 0.079292 11.4458 0 11.2462 0C11.0466 0 10.8552 0.079292 10.7141 0.220433L6 4.94251L1.28592 0.220433C1.14479 0.079292 0.953384 1.77216e-07 0.753802 1.78703e-07C0.554221 1.80191e-07 0.362814 0.079292 0.221688 0.220433C0.0805626 0.361573 0.0012792 0.553001 0.0012792 0.752604C0.0012792 0.952206 0.0805626 1.14363 0.221688 1.28477L4.94327 5.99936L0.221688 10.7139C0.151443 10.7836 0.0956875 10.8665 0.0576386 10.9579C0.0195897 11.0492 0 11.1472 0 11.2461C0 11.3451 0.0195897 11.443 0.0576386 11.5344C0.0956875 11.6257 0.151443 11.7086 0.221688 11.7783C0.29136 11.8485 0.37425 11.9043 0.465579 11.9424C0.556907 11.9804 0.654865 12 0.753802 12C0.85274 12 0.950698 11.9804 1.04203 11.9424C1.13335 11.9043 1.21625 11.8485 1.28592 11.7783L6 7.05621L10.7141 11.7783C10.7838 11.8485 10.8666 11.9043 10.958 11.9424C11.0493 11.9804 11.1473 12 11.2462 12C11.3451 12 11.4431 11.9804 11.5344 11.9424C11.6257 11.9043 11.7086 11.8485 11.7783 11.7783C11.8486 11.7086 11.9043 11.6257 11.9424 11.5344C11.9804 11.443 12 11.3451 12 11.2461C12 11.1472 11.9804 11.0492 11.9424 10.9579C11.9043 10.8665 11.8486 10.7836 11.7783 10.7139L7.05673 5.99936Z"
                        fill="#4159A5"
                    />
                </CloseSvg>
            </TitleWrapper>

            <MemoDetailsWrapper>
                <div>
                    <MemoTitle href={url} target="_blank">{title}</MemoTitle>
                    {/* <MemoUrl>{url}</MemoUrl> */}
                </div>

                <MemoNotes>{notes}</MemoNotes>

                <HorizontalLine />

                <DateRow>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17.1111 0C16.4389 0 15.8889 0.495 15.8889 1.1V2.2H6.11111V1.1C6.11111 0.495 5.56111 0 4.88889 0C4.21667 0 3.66667 0.495 3.66667 1.1V2.2H2.44444C1.08778 2.2 0.0122222 3.19 0.0122222 4.4L0 19.8C0 21.01 1.08778 22 2.44444 22H19.5556C20.9 22 22 21.01 22 19.8V4.4C22 3.19 20.9 2.2 19.5556 2.2H18.3333V1.1C18.3333 0.495 17.7833 0 17.1111 0ZM19.5556 19.8H2.44444V8.8H19.5556V19.8ZM9.77778 12.1C9.77778 11.495 10.3278 11 11 11C11.6722 11 12.2222 11.495 12.2222 12.1C12.2222 12.705 11.6722 13.2 11 13.2C10.3278 13.2 9.77778 12.705 9.77778 12.1ZM4.88889 12.1C4.88889 11.495 5.43889 11 6.11111 11C6.78333 11 7.33333 11.495 7.33333 12.1C7.33333 12.705 6.78333 13.2 6.11111 13.2C5.43889 13.2 4.88889 12.705 4.88889 12.1ZM14.6667 12.1C14.6667 11.495 15.2167 11 15.8889 11C16.5611 11 17.1111 11.495 17.1111 12.1C17.1111 12.705 16.5611 13.2 15.8889 13.2C15.2167 13.2 14.6667 12.705 14.6667 12.1ZM9.77778 16.5C9.77778 15.895 10.3278 15.4 11 15.4C11.6722 15.4 12.2222 15.895 12.2222 16.5C12.2222 17.105 11.288px6722 17.6 11 17.6C10.3278 17.6 9.77778 17.105 9.77778 16.5ZM4.88889 16.5C4.88889 15.895 5.43889 15.4 6.11111 15.4C6.78333 15.4 7.33333 15.895 7.33333 16.5C7.33333 17.105 6.78333 17.6 6.11111 17.6C5.43889 17.6 4.88889 17.105 4.88889 16.5ZM14.6667 16.5C14.6667 15.895 15.2167 15.4 15.8889 15.4C16.5611 15.4 17.1111 15.895 17.1111 16.5C17.1111 17.105 16.5611 17.6 15.8889 17.6C15.2167 17.6 14.6667 17.105 14.6667 16.5Z"
                            fill="#3B3B3B"
                        />
                    </svg>
                    <FormattedDate>{formattedDate}</FormattedDate>
                </DateRow>

            </MemoDetailsWrapper>
        </SavedWrapper>
    )
}

export default Saved;