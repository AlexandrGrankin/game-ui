import React from 'react';
import "./InteractiveBorder.css"

const InteractiveBorder = ({outerSize, backColorStartLiner, backColorEndLiner, icons, size, name}) => {
    const iconName = `${name}__icon`;
    const iconBackground = `${name}__background`;

    return (
        <div className="interactive__border">
            <div style={{
                height: outerSize + 'vw',
                width: outerSize + 'vw',
            }}
                 className={`interactive__border__outer ${iconName}`}
            >
                <div style={{
                    height: (outerSize - (outerSize * 0.1)) + 'vw',
                    width: (outerSize - (outerSize * 0.1)) + 'vw',
                    background: `linear-gradient(to bottom, ${backColorStartLiner}, ${backColorEndLiner})` // Линейный градиент от #0A4589 до #062A55
                }}
                     className='interactive__border__inner'
                >
                    {icons && <img style={{
                        height: size + 'vw'
                    }}
                                   className="icon__border" src={icons} alt="Icon"/>}
                </div>
            </div>
        </div>
    );
};

export default InteractiveBorder;
