import React from "react";
import styled from "styled-components";

const MemoWrapper = styled.div`

`;

const SectionTitle = styled.p`
    font-family: Inter,sans-serif;
    font-size: 14px;
    color: #3B3B3B;
    margin-bottom: 14px;
`;

const InputContainer = styled.div`
    margin-bottom: 8px;
    height: 48px;
    display: flex;
`;

interface InputProps {
    title: string;
}

export const sharedInputStyles = `
    background: #FFFFFF;
    border-radius: 8px;
    width: 100%;
    border: 2px solid #3B3B3B;
    padding: 12px 16px;
    outline: none;
    outline-offset: 0px;
    placeholder: #3B3B3B;
    font-family: Inter,sans-serif;
    font-size: 14px;
    color: #3B3B3B;
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
`;

const TitleInput = styled.input<InputProps>`
    ${sharedInputStyles}
    border-color: #3B3B3B;
`;

const UrlInput = styled.input`
    ${sharedInputStyles}
`;

const UrlLabel = styled.label`
    position: absolute;
    font-family: Inter,sans-serif;
    font-size: 12px;
    color: #3B3B3B;
    top: 99px;
    left: 34px;
    background: #FFFFFF;
    padding: 0 4px;
    height: fit-content;
`;

interface MemoDetailsProps {
    title: string;
    titleUp: boolean;
    url: string;
    setTitle: (title: string) => void;
    setTitleUp: (titleUp: boolean) => void;
    setUrl: (url: string) => void;
}

const MemoDetails: React.FC<MemoDetailsProps> = ({ title, titleUp, setTitle, setTitleUp, url, setUrl }) => {
    return (
        <MemoWrapper>
            <SectionTitle>Memo Details</SectionTitle>
            <InputContainer>
                <TitleInput
                    title={title}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={titleUp ? '' : 'Title'}
                    onFocus={() => setTitleUp(true)}
                    onBlur={() => setTitleUp(false)}
                />
            </InputContainer>

            <InputContainer>
                <UrlInput
                    type="text"
                    value={url}
                    //   data=${encodeURIComponent(
                    //     JSON.stringify(req.user)
                    // };
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="www.example.com"
                />
                <UrlLabel>URL</UrlLabel>
            </InputContainer>
        </MemoWrapper>
    );
}

export default MemoDetails;