import React, { useReducer, createContext } from 'react';
import { TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { Alert } from './alert';

const AlertContainerStyle = styled.div`
    width: 280px;
    position: absolute;
    top: 25px;
    z-index: 9999;
    margin-top: 10px;
    right: 15px;
`;
export const AlertContext = createContext();

export const AlertProvider = props => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'ADD_ALERT':
                if (state.length >= 3) return state;
                return [...state, {...action.payload}];
            case 'REMOVE_ALERT':
                return state.filter(el => el.id !== action.id);
            default:
                return state;
        }
    }, []);
    return (
        <AlertContext.Provider value={dispatch}>
            <AlertContainerStyle>
                <TransitionGroup>
                    {state.map((alert) => {
                        console.log(alert)
                        return <Alert dispatch={dispatch} key={alert.id} {...alert} />
                    }) }
                </TransitionGroup>
            </AlertContainerStyle>
            {props.children}
        </AlertContext.Provider>
    );
}