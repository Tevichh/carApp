import styled from 'styled-components';

export const FloatPoint = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
`;

export const FloatLabel = styled.div`
    width: 25px;
    height: 25px;
    position: absolute;
    left: -20px;
    top: -20px;
    background-color: #2B2A24;
    border-radius: 50%;
    font-family: sans-serif;
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
    line-height: 25px;
    transition: 0.3s all ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.1, 1.1);
        background-color: #eeeeee;
        transition: 0.3s all ease;
    }

    &::before {
        content: '\\2713'; /* Doble barra invertida para escapar el carácter especial */
        color: #000;
        display: block;
    }
`;