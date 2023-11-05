import React from "react";
import styled from "styled-components";

const ContainerWrapper = styled.div`
    width: 288px;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    background: #F1F1F1;
    margin: 0px;
    box-sizing: border-box;
`;

interface ContainerProps {
    children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <ContainerWrapper id="content-script-root">
            {children}
        </ContainerWrapper>
    );
}

export default Container;