import React from 'react';
import "./InteractiveBorderClick.css"

const InteractiveBorderClick = ({outerSize, backColorStartLiner, backColorEndLiner, icons}) => {

    return (
        <div className="interactive__border">
            <div style={{
                height: outerSize + 'vw',
                width: outerSize + 'vw',
            }}
                 className='interactive__border__outer'
            >
                <div style={{
                    height: (outerSize - (outerSize * 0.1)) + 'vw',
                    width: (outerSize - (outerSize * 0.1)) + 'vw',
                    background: `linear-gradient(to bottom, ${backColorStartLiner}, ${backColorEndLiner})` // Линейный градиент от #0A4589 до #062A55
                }}
                     className='interactive__border__inner'
                >

                </div>
            </div>
        </div>
    );
};

export default InteractiveBorderClick;
