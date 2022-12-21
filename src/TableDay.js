function TableDay({data, delDate, updDate}){
    return ( <table className="conteiner__table">
            <thead className="conteiner__head-table"><tr><th>Дата (ДД.ММ.ГГ)</th><th>Пройдено км</th><th>Действия</th></tr></thead>
            <tbody className="conteiner__body-table">
                {
                    data.map(el => <tr key={el["date"]}>
                        <td>{el["date"]}</td><td>{el["value"]}</td>
                        <td>
                            <span onClick={(e)=>delDate(el["date"])}>×</span>
                            <span  onClick={(e)=>updDate(el["date"])}>🖊</span>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
       )
}

export default TableDay;