import styled from 'styled-components';

export const InputSlider = styled.input`
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
`;
