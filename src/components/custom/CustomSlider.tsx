import React from 'react'
import { Slider } from 'rsuite'

const CustomSlider = (props: any) => {
  return (
    <div style={{...props.style}}>
      <Slider
        value={props.val}
        min={props.min}
        step={props.step}
        max={props.max}
        graduated
        progress
        onChange={v => props.onValChange(v)}
        tooltip={props.tooltip}
      />
    </div>
  );
}

export default CustomSlider