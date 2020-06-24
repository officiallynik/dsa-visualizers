import React, { useState } from 'react'

const MainApp: React.FC = (props: any) => {
    const tree = useState([10, 5, 15, 2, 3, 20])[0]

    return (
        <div>
            {tree.map((ele, idx) => {
                return (
                    <div>
                        {ele}     
                    </div>
                )
            })}
        </div>
    )
}

export default MainApp