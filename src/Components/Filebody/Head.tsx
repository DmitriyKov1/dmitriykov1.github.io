import React from "react";

const Head: React.FC = () => {
    return (
        <thead>
            <tr>
                <th>
                    <input type="checkbox" />
                </th>
                <th>Имя</th>
                <th>Размер</th>
                <th>Дата изменения</th>
            </tr>
        </thead>
    );
};

export default Head;
