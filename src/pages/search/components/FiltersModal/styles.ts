import styled from 'styled-components';

import { ButtonContainer } from '~/components/Button/styles';

export const FiltersModalContainer = styled.div`
  flex: 1;
  width: 84%;
  max-width: 460px;
  background: #fff;

  header {
    background: ${(props) => props.theme.colors.primary};
    height: 6.2rem;
    display: flex;
    align-items: center;
    padding-left: 2rem;
  }

  section {
    padding: 2.4rem;

    ${ButtonContainer} {
      margin-top: 3rem;
    }
  }

  .needs {
    margin-top: 12px;
  }

  .range {
    margin-top: 8px;
    display: flex;
    align-items: center;
    &__slider {
      flex: 1;
      height: 35px;
      width: 100%;
      display: block;
      background: linear-gradient(to right, #cccccc 0%, #cccccc 100%);
      background-position: center;
      background-size: 99% 4px;
      background-repeat: no-repeat;
      appearance: none;
      &::-webkit-slider-thumb {
        position: relative;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: white;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5), 1px 3px 5px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        -webkit-appearance: none;
      }
      &::-webkit-slider-thumb:before {
        /* what creates the colorful line on the left side of the slider */
        position: absolute;
        top: 8px;
        left: -2001px;
        width: 2000px;
        height: 4px;
        background: #444444;
        content: ' ';
      }
      &::-webkit-slider-thumb:after {
        /* create a larger (but hidden) hit area */
        position: absolute;
        top: -20px;
        left: -20px;
        padding: 30px;
        content: ' ';
      }
    }
    &__value {
      min-width: 7.2rem;
      margin-left: 8px;
      text-align: center;
      ${(props) => props.theme.typography.body}
      color: ${(props) => props.theme.colors.primary}
    }
  }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 60%);
  position: absolute;
  top: 0;
  left: 0;

  z-index: 5;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  overflow: auto;
`;
