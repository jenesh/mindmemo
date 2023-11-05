import React from "react";
import styled, { keyframes } from "styled-components";

const NotesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
`;

const SectionTitle = styled.p`
    &&& {
        font-family: Inter,sans-serif;
    }
    font-size: 14px;
    color: #3B3B3B;
    margin: 0;
    margin-bottom: 14px;
`;

interface NotesTextAreaProps {
    notes: string;
}

const NotesTextArea = styled.textarea<NotesTextAreaProps>`
    &&& {
        font-family: Inter,sans-serif;
    }
    height: 148px;
    background: #F1F1F1;
    border-radius: 8px;
    width: 100%;
    border: 2px solid #3B3B3B;
    padding: 12px 16px;
    outline: none;
    outline-offset: 0px;
    placeholder: #3B3B3B;
    font-size: 14px;
    color: #3B3B3B;
    resize: none;
    &:hover {
        border: 2px solid #3B3B3B;
    }
    &:focus {
        border: 2px solid #4159A5;
        ring: #4159A5;
    }
    &:active {
        outline: none;
    }
    box-sizing: border-box;
`;

const  glowing = keyframes`
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
`

const SaveButton = styled.button`
    &&& {
        font-family: Inter,sans-serif;
    }
    font-size: 14px;
    color: #FFFFFF;
    padding: 16px;
    margin-top: 16px; 
    border-radius: 20px;
    background: #4159A5;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${(props) => props.disabled ? '0.7' : '1'};

    // &:before {
    //     content: '';
    //     background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    //     position: absolute;
    //     top: -2px;
    //     left:-2px;
    //     background-size: 100%;
    //     z-index: -1;
    //     filter: blur(5px);
    //     width: calc(100% + 4px);
    //     height: calc(100% + 4px);
    //     animation: ${glowing} 20s linear infinite;
    //     opacity: 0;
    //     transition: opacity .3s ease-in-out;
    //     border-radius: 10px;
    // }

    // &:active {
    //     color: #000
    // }

    // &:active:after {
    //     background: transparent;
    // }

    // &:hover:before {
    //     opacity: 1;
    // }

    // &:after {
    //     z-index: -1;
    //     content: '';
    //     position: absolute;
    //     width: 100%;
    //     height: 100%;
    //     background: #111;
    //     left: 0;
    //     top: 0;
    //     border-radius: 10px;
    // }
`;

interface NotesProps {
    notes: string;
    canSave: boolean;
    setNotes: (notes: string) => void;
    handleSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Notes: React.FC<NotesProps> = ({ notes, canSave, setNotes, handleSave }) => {
    return (
        <NotesWrapper>
            <SectionTitle>Notes (optional)</SectionTitle>
            <NotesTextArea
                notes={notes}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add details for extra content."
            />
            <SaveButton onClick={handleSave} disabled={!canSave}>Save MindMemo</SaveButton>
        </NotesWrapper>
    );
}

export default Notes;