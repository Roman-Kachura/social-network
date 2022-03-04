export const howNumberOfPagesReselect = ({totalCount,pagesSize}:NumberOfPagesPropsType) => Math.ceil(totalCount / pagesSize);
export const correctDate = (fullDate:string) => {
    let [date, time] = fullDate.replace('T', ' ').split(' ');
    let dateArray = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'];
    return{
        time:time.substring(0, 8),
        date:`${dateArray[2]} ${months[+dateArray[1] - 1]} ${dateArray[0]}`
    }
}

export type NumberOfPagesPropsType = {
    totalCount:number
    pagesSize:number
}