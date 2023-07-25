import useDateFormat from '../Hooks/useDateFormat';

const DateWrapper = ({ tDate }) => {
    const formattedDate = useDateFormat(tDate);
    return <div>{formattedDate}</div>;
};
export default DateWrapper