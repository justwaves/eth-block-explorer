import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const ToggleWrapper = styled.div`
  margin-right: 8px;
  vertical-align: middle;
  touch-action: pan-x;

  display: inline-block;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  padding: 0;
 

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
      -webkit-transition: opacity 0.25s;
      transition: opacity 0.25s;
    `}

    ${props =>
      props.checked &&
      !props.disabled &&
      css`
        &:hover {
          .react-toggle-track {
            background-color: blue;
          }
        }
      `}

  ${props =>
    !props.checked &&
    !props.disabled &&
    css`
      &:hover {
        .react-toggle-track {
          background-color: black;
        }
      }
    `}
`;

const Track = styled.div`
  width: 50px;
  height: 24px;
  padding: 0;
  border-radius: 30px;
  background-color: #4d4d4d;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  transition: all 0.2s ease;

  ${props =>
    props.checked &&
    css`
      background-color: ${props.theme.colors.primary[1]};
    `}
`;

const TrackCheck = styled.div`
  position: absolute;
  width: 14px;
  height: 10px;
  top: 0px;
  bottom: 0px;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 0;
  left: 8px;
  opacity: 0;
  -webkit-transition: opacity 0.25s ease;
  -moz-transition: opacity 0.25s ease;
  transition: opacity 0.25s ease;

  ${props =>
    props.checked &&
    css`
      opacity: 1;
      -webkit-transition: opacity 0.25s ease;
      -moz-transition: opacity 0.25s ease;
      transition: opacity 0.25s ease;
    `}
`;

const TrackX = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  top: 0px;
  bottom: 0px;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 0;
  right: 10px;
  opacity: 1;
  -webkit-transition: opacity 0.25s ease;
  -moz-transition: opacity 0.25s ease;
  transition: opacity 0.25s ease;

  ${props =>
    props.checked &&
    css`
      opacity: 0;
    `}
`;

const Thumb = styled.div`
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  position: absolute;
  top: 1px;
  left: 1px;
  width: 22px;
  height: 22px;
  border: 1px solid #4d4d4d;
  border-radius: 50%;
  background-color: #fafafa;

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  -webkit-transition: all 0.25s ease;
  -moz-transition: all 0.25s ease;
  transition: all 0.25s ease;

  ${props =>
    props.checked &&
    css`
      left: 27px;
      border-color: ${props.theme.colors.primary[1]};
    `}
`;

const ScreenreaderOnly = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const Toggle = props => {
  const {
    checked,
    disabled,
    defaultChecked,
    onChange,
    onFocus,
    onBlur,
    className,
    name,
    value,
    id,
    icons,
    ...inputProps
  } = props;
  const [checkedS, setCheckedS] = useState(checked);
  const [hasFocus, setHasFocus] = useState(false);
  const [moved, setMoved] = useState(false);
  const [startX, setStartX] = useState(null);
  const [activated, setActivated] = useState(null);
  const [previouslyChecked, setPreviouslyChecked] = useState(
    !(checked || defaultChecked),
  );
  const inputRef = useRef();

  useEffect(() => {
    if (checked !== checkedS) {
      setCheckedS(checked);
    }
  }, [checked, checkedS]);

  const pointerCoord = event => {
    if (event) {
      const { changedTouches, pageX } = event;
      if (changedTouches && changedTouches.length > 0) {
        const touch = changedTouches[0];
        return { x: touch.clientX, y: touch.clientY };
      }
      if (pageX !== undefined) {
        return { x: pageX, y: event.pageY };
      }
    }
    return { x: 0, y: 0 };
  };

  const handleClick = event => {
    if (disabled) {
      return;
    }
    const checkbox = inputRef.current;
    if (event.target !== checkbox && !moved) {
      setPreviouslyChecked(checkbox.checked);
      event.preventDefault();
      checkbox.focus();
      checkbox.click();
      return;
    }

    const hasProperty = Object.prototype.hasOwnProperty.call(props, 'checked');

    if (hasProperty) {
      setCheckedS(checked);
    } else {
      setCheckedS(checkbox.checked);
    }
  };

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      if (disabled) {
        return;
      }
      const checkbox = inputRef.current;
      if (event.target !== checkbox && !moved) {
        setPreviouslyChecked(checkbox.checked);
        event.preventDefault();
        checkbox.focus();
        checkbox.click();
        return;
      }

      if (checked) {
        setCheckedS(checked);
      } else {
        setCheckedS(checkbox.checked);
      }
    }
  };

  const handleTouchStart = event => {
    if (disabled) {
      return;
    }
    setStartX(pointerCoord(event).x);
    setActivated(true);
  };

  const handleTouchMove = event => {
    if (!activated) return;
    setMoved(true);

    if (startX) {
      const currentX = pointerCoord(event).x;

      if (checkedS && currentX + 15 < startX) {
        setCheckedS(false);
        setStartX(currentX);
        setActivated(true);
      } else if (currentX - 15 > startX) {
        setCheckedS(true);
        setStartX(currentX);
        setActivated(currentX < startX + 5);
      }
    }
  };

  const handleTouchEnd = event => {
    if (!moved) return;
    const checkbox = inputRef.current;
    event.preventDefault();

    if (startX) {
      const endX = pointerCoord(event).x;
      if (previouslyChecked === true && startX + 4 > endX) {
        if (previouslyChecked !== checkedS) {
          setCheckedS(false);
          setPreviouslyChecked(checkedS);
          checkbox.click();
        }
      } else if (startX - 4 < endX) {
        if (previouslyChecked !== checkedS) {
          setCheckedS(true);
          setPreviouslyChecked(checkedS);
          checkbox.click();
        }
      }
      setActivated(false);
      setStartX(null);
      setMoved(false);
    }
  };

  const handleFocus = event => {
    if (onFocus) {
      onFocus(event);
    }
    setHasFocus(true);
  };

  const handleBlur = event => {
    if (onBlur) {
      onBlur(event);
    }
    setHasFocus(false);
  };

  const getIcon = type => {
    if (!icons) {
      return null;
    }
    return icons[type] === undefined
      ? Toggle.defaultProps.icons[type]
      : icons[type];
  };

  return (
    <ToggleWrapper
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      checked={checked}
      disabled={disabled}
      hasFocus={hasFocus}
    >
      <Track className="react-toggle-track" checked={checked}>
        <TrackCheck checked={checked}>{getIcon('checked')}</TrackCheck>
        <TrackX checked={checked}>{getIcon('unchecked')}</TrackX>
      </Track>
      <Thumb checked={checked} />
      <ScreenreaderOnly
        {...inputProps}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="checkbox"
      />
    </ToggleWrapper>
  );
};

Toggle.defaultProps = {
  icons: {
    checked: (
      <svg width="14" height="11" viewBox="0 0 14 11">
        <path
          d="M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0"
          fill="#fff"
          fillRule="evenodd"
        />
      </svg>
    ),
    unchecked: (
      <svg width="10" height="10" viewBox="0 0 10 10">
        <path
          d="M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12"
          fill="#fff"
          fillRule="evenodd"
        />
      </svg>
    ),
  },
};

export default Toggle;
