import PropTypes, { string, number, Date } from 'prop-types';

const dateProp = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
]).isRequired;
export default {
    min: dateProp,
    max: dateProp,
    currentMin: dateProp,
    currentMax: dateProp,
    onChange: PropTypes.func.isRequired,
};
