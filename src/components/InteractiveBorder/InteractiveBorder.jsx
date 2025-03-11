import React from 'react';
import "./InteractiveBorder.css"

const InteractiveBorder = ({innerSize, outerSize, backColorStartLiner, backColorEndLiner, icons}) => {

    return (
        <div className="interactive__border">
            <div style={{
                height: outerSize,
                width: outerSize,
            }}
                 className='interactive__border__outer'
            >
                <div style={{
                    height: innerSize,
                    width: innerSize,
                    background: `linear-gradient(to bottom, ${backColorStartLiner}, ${backColorEndLiner})` // Линейный градиент от #0A4589 до #062A55
                }}
                     className='interactive__border__inner'
                >

                </div>
            </div>
        </div>
    );
};

export default InteractiveBorder;
